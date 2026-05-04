"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roleLabels } from "@/data/crm";
import { clearAuthSession, getDefaultAdminPath, saveAuthSession } from "@/lib/auth-session";
import { createEmployeeSchema } from "@/lib/form-schemas";
import { getSavedClientProfile, saveClientProfile } from "@/lib/client-profile";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { UserRole } from "@/types/user";

const employeeEmails = [
  "admin@autocitypro.ru",
  "sales1@autocitypro.ru",
  "sales2@autocitypro.ru",
  "service@autocitypro.ru",
  "service2@autocitypro.ru",
  "mechanic@autocitypro.ru",
  "mechanic2@autocitypro.ru",
  "tradein@autocitypro.ru",
  "tradein2@autocitypro.ru",
  "manager@autocitypro.ru"
];

const employeeRoleByEmail: Record<string, UserRole> = {
  "admin@autocitypro.ru": "admin",
  "sales1@autocitypro.ru": "sales_manager",
  "sales2@autocitypro.ru": "sales_manager",
  "service@autocitypro.ru": "service_manager",
  "service2@autocitypro.ru": "service_manager",
  "mechanic@autocitypro.ru": "mechanic",
  "mechanic2@autocitypro.ru": "mechanic",
  "tradein@autocitypro.ru": "trade_in_appraiser",
  "tradein2@autocitypro.ru": "trade_in_appraiser",
  "manager@autocitypro.ru": "sales_manager"
};

const loginSchema = z.object({
  identifier: z.string().min(3, "Укажите email сотрудника или телефон клиента"),
  password: z.string().min(6, "Минимум 6 символов")
});

const employeeRegisterSchema = createEmployeeSchema.extend({
  password: z.string().min(8, "Минимум 8 символов")
});

const clientRegisterSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон"),
  password: z.string().min(6, "Минимум 6 символов")
});

type AuthMode = "login" | "client-register" | "employee-register";
type LoginFormValues = z.infer<typeof loginSchema>;
type EmployeeRegisterValues = z.infer<typeof employeeRegisterSchema>;
type ClientRegisterValues = z.infer<typeof clientRegisterSchema>;

const employeeRoles = [
  "sales_manager",
  "service_manager",
  "mechanic",
  "trade_in_appraiser",
  "admin"
] as const;

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function isEmployeeIdentifier(identifier: string) {
  const normalized = identifier.trim().toLowerCase();
  return employeeEmails.includes(normalized) || normalized.endsWith("@autocitypro.ru");
}

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const clientRegisterForm = useForm<ClientRegisterValues>({
    resolver: zodResolver(clientRegisterSchema)
  });

  const employeeRegisterForm = useForm<EmployeeRegisterValues>({
    resolver: zodResolver(employeeRegisterSchema),
    defaultValues: {
      role: "sales_manager",
      status: "active",
      phone: ""
    }
  });

  useEffect(() => {
    const profile = getSavedClientProfile();

    if (profile) {
      loginForm.setValue("identifier", profile.phone);
      clientRegisterForm.setValue("name", profile.name);
      clientRegisterForm.setValue("phone", profile.phone);
    }
  }, [clientRegisterForm, loginForm]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setServerMessage(null);
  }

  function onLoginSubmit(values: LoginFormValues) {
    const identifier = values.identifier.trim();
    clearAuthSession();

    if (isEmployeeIdentifier(identifier)) {
      const email = identifier.toLowerCase();
      const role = employeeRoleByEmail[email] ?? "sales_manager";
      saveAuthSession({
        type: "employee",
        name: roleLabels[role],
        email,
        role
      });
      setServerMessage("Вход сотрудника выполнен. Открываем рабочий раздел.");
      router.push(getDefaultAdminPath(role));
      return;
    }

    const savedProfile = getSavedClientProfile();
    const savedPhone = savedProfile ? normalizePhone(savedProfile.phone) : "";
    const enteredPhone = normalizePhone(identifier);

    if (savedProfile && enteredPhone && savedPhone === enteredPhone) {
      saveAuthSession({
        type: "client",
        clientId: savedProfile.clientId,
        name: savedProfile.name,
        phone: savedProfile.phone
      });
      setServerMessage("Вход клиента выполнен. Данные будут подставляться в заявки.");
      router.push("/account");
      return;
    }

    setServerMessage("Клиент с таким телефоном не найден на этом устройстве. Зарегистрируйтесь как клиент.");
    setMode("client-register");
    clientRegisterForm.setValue("phone", identifier);
  }

  function onClientRegisterSubmit(values: ClientRegisterValues) {
    const profile = saveClientProfile(values);
    if (profile) {
      saveAuthSession({
        type: "client",
        clientId: profile.clientId,
        name: profile.name,
        phone: profile.phone
      });
    }
    setServerMessage("Клиент зарегистрирован. ФИО и телефон будут автоматически подставляться в формы.");
    router.push("/account");
  }

  async function onEmployeeRegisterSubmit(values: EmployeeRegisterValues) {
    setServerMessage(null);

    const employee = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      status: values.status
    };
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    });

    if (!response.ok) {
      setServerMessage("Не удалось зарегистрировать сотрудника. Проверьте email или попробуйте другой.");
      return;
    }

    saveAuthSession({
      type: "employee",
      name: values.name,
      email: values.email,
      role: values.role
    });
    setServerMessage("Сотрудник зарегистрирован. Открываем админку.");
    router.push(getDefaultAdminPath(values.role));
  }

  return (
    <GlassCard className="w-full max-w-2xl p-6 md:p-8">
      <div className="mb-8 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
          {mode === "login" ? (
            <LockKeyhole className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
          ) : (
            <UserPlus className="h-5 w-5 text-luxury-champagne" aria-hidden="true" />
          )}
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold">Единый вход</h1>
          <p className="mt-2 text-sm leading-6 text-luxury-soft">
            Введите email сотрудника, чтобы попасть в админку, или телефон клиента, чтобы открыть клиентский сценарий с автоподстановкой данных.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 sm:grid-cols-3">
        <ModeButton active={mode === "login"} onClick={() => switchMode("login")}>
          Войти
        </ModeButton>
        <ModeButton active={mode === "client-register"} onClick={() => switchMode("client-register")}>
          Клиент
        </ModeButton>
        <ModeButton active={mode === "employee-register"} onClick={() => switchMode("employee-register")}>
          Сотрудник
        </ModeButton>
      </div>

      {mode === "login" ? (
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="grid gap-5">
          <InputField
            label="Email сотрудника или телефон клиента"
            id="auth-identifier"
            placeholder="admin@autocitypro.ru или +7 473 200-80-08"
            error={loginForm.formState.errors.identifier?.message}
            {...loginForm.register("identifier")}
          />
          <InputField
            label="Пароль"
            id="auth-password"
            type="password"
            placeholder="Минимум 6 символов"
            error={loginForm.formState.errors.password?.message}
            {...loginForm.register("password")}
          />
          <StatusMessage message={serverMessage} />
          <PrimaryButton type="submit" className="w-full justify-center">
            Войти
          </PrimaryButton>
        </form>
      ) : null}

      {mode === "client-register" ? (
        <form onSubmit={clientRegisterForm.handleSubmit(onClientRegisterSubmit)} className="grid gap-5">
          <InputField
            label="ФИО"
            id="client-name"
            placeholder="Алексей Морозов"
            error={clientRegisterForm.formState.errors.name?.message}
            {...clientRegisterForm.register("name")}
          />
          <InputField
            label="Телефон"
            id="client-phone"
            placeholder="+7 473 200-80-08"
            error={clientRegisterForm.formState.errors.phone?.message}
            {...clientRegisterForm.register("phone")}
          />
          <InputField
            label="Пароль"
            id="client-password"
            type="password"
            placeholder="Минимум 6 символов"
            error={clientRegisterForm.formState.errors.password?.message}
            {...clientRegisterForm.register("password")}
          />
          <StatusMessage message={serverMessage} />
          <PrimaryButton type="submit" className="w-full justify-center">
            Зарегистрироваться клиентом
          </PrimaryButton>
        </form>
      ) : null}

      {mode === "employee-register" ? (
        <form onSubmit={employeeRegisterForm.handleSubmit(onEmployeeRegisterSubmit)} className="grid gap-5">
          <InputField
            label="ФИО"
            id="employee-name"
            placeholder="Алексей Морозов"
            error={employeeRegisterForm.formState.errors.name?.message}
            {...employeeRegisterForm.register("name")}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Email"
              id="employee-email"
              type="email"
              placeholder="manager@autocitypro.ru"
              error={employeeRegisterForm.formState.errors.email?.message}
              {...employeeRegisterForm.register("email")}
            />
            <InputField
              label="Телефон"
              id="employee-phone"
              placeholder="+7 473 200-80-08"
              error={employeeRegisterForm.formState.errors.phone?.message}
              {...employeeRegisterForm.register("phone")}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-role">Роль</Label>
              <select
                id="employee-role"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20"
                {...employeeRegisterForm.register("role")}
              >
                {employeeRoles.map((role) => (
                  <option key={role} value={role} className="bg-luxury-main">
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              label="Пароль"
              id="employee-password"
              type="password"
              placeholder="Минимум 8 символов"
              error={employeeRegisterForm.formState.errors.password?.message}
              {...employeeRegisterForm.register("password")}
            />
          </div>
          <input type="hidden" value="active" {...employeeRegisterForm.register("status")} />
          <StatusMessage message={serverMessage} />
          <PrimaryButton type="submit" disabled={employeeRegisterForm.formState.isSubmitting} className="w-full justify-center">
            {employeeRegisterForm.formState.isSubmitting ? "Регистрируем..." : "Зарегистрироваться сотрудником"}
          </PrimaryButton>
        </form>
      ) : null}
    </GlassCard>
  );
}

function ModeButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-xl text-sm font-semibold transition",
        active ? "bg-luxury-champagne text-luxury-main" : "text-white/60 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function StatusMessage({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p role="status" className="text-sm leading-6 text-luxury-champagne">
      {message}
    </p>
  );
}
