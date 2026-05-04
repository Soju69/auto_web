"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roleLabels } from "@/data/crm";
import { clearAuthSession, getDefaultAdminPath, saveAuthSession } from "@/lib/auth-session";
import { getSavedClientProfile, saveClientProfile } from "@/lib/client-profile";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { InputField } from "@/components/ui/InputField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { User, UserRole } from "@/types/user";

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

const optionalEmailSchema = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((value) => !value || z.string().email().safeParse(value).success, "Укажите корректный email");

const loginSchema = z.object({
  identifier: z.string().min(3, "Укажите email сотрудника или телефон клиента"),
  password: z.string().min(6, "Минимум 6 символов")
});

const clientRegisterSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон").refine((value) => normalizePhone(value).length >= 7, "Укажите корректный телефон"),
  email: optionalEmailSchema,
  password: z.string().min(6, "Минимум 6 символов")
});

type AuthMode = "login" | "client-register";
type LoginFormValues = z.infer<typeof loginSchema>;
type ClientRegisterValues = z.infer<typeof clientRegisterSchema>;
type EmployeeIdentityConflict = "phone" | "email" | null;

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isEmployeeIdentifier(identifier: string) {
  const normalized = normalizeEmail(identifier);
  return employeeEmails.includes(normalized) || normalized.endsWith("@autocitypro.ru");
}

async function getEmployees() {
  const response = await fetch("/api/admin/users");

  if (!response.ok) {
    return [] as User[];
  }

  return (await response.json()) as User[];
}

async function getEmployeeConflict({
  phone,
  email
}: {
  phone: string;
  email?: string;
}): Promise<EmployeeIdentityConflict> {
  const employees = await getEmployees();
  const normalizedPhone = normalizePhone(phone);
  const normalizedEmail = email ? normalizeEmail(email) : "";

  for (const employee of employees) {
    const employeePhone = employee.phone ? normalizePhone(employee.phone) : "";
    const employeeEmail = normalizeEmail(employee.email);

    if (normalizedPhone && employeePhone && normalizedPhone === employeePhone) {
      return "phone";
    }

    if (normalizedEmail && normalizedEmail === employeeEmail) {
      return "email";
    }
  }

  return null;
}

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const clientRegisterForm = useForm<ClientRegisterValues>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      email: ""
    }
  });

  useEffect(() => {
    const profile = getSavedClientProfile();

    if (profile) {
      loginForm.setValue("identifier", profile.phone);
      clientRegisterForm.setValue("name", profile.name);
      clientRegisterForm.setValue("phone", profile.phone);
      clientRegisterForm.setValue("email", profile.email ?? "");
    }
  }, [clientRegisterForm, loginForm]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setServerMessage(null);
  }

  async function onLoginSubmit(values: LoginFormValues) {
    const identifier = values.identifier.trim();
    clearAuthSession();

    if (isEmployeeIdentifier(identifier)) {
      const email = normalizeEmail(identifier);
      const role = employeeRoleByEmail[email] ?? "sales_manager";
      saveAuthSession({
        type: "employee",
        name: roleLabels[role],
        email,
        role
      });
      router.push(getDefaultAdminPath(role));
      return;
    }

    const savedProfile = getSavedClientProfile();
    const enteredPhone = normalizePhone(identifier);

    if (savedProfile && enteredPhone && normalizePhone(savedProfile.phone) === enteredPhone) {
      saveAuthSession({
        type: "client",
        clientId: savedProfile.clientId,
        name: savedProfile.name,
        phone: savedProfile.phone,
        email: savedProfile.email
      });
      router.push("/account");
      return;
    }

    setServerMessage("Клиент с таким телефоном не найден на этом устройстве. Зарегистрируйтесь как клиент.");
    setMode("client-register");
    clientRegisterForm.setValue("phone", identifier);
  }

  async function onClientRegisterSubmit(values: ClientRegisterValues) {
    setServerMessage(null);

    const conflict = await getEmployeeConflict({ phone: values.phone, email: values.email });

    if (conflict === "phone") {
      setServerMessage("Этот телефон уже закреплен за сотрудником. Используйте другой номер клиента.");
      return;
    }

    if (conflict === "email") {
      setServerMessage("Этот email уже используется сотрудником. Укажите другой email или оставьте поле пустым.");
      return;
    }

    const profile = saveClientProfile({
      ...values,
      email: values.email || undefined
    });

    if (profile) {
      saveAuthSession({
        type: "client",
        clientId: profile.clientId,
        name: profile.name,
        phone: profile.phone,
        email: profile.email
      });
    }

    router.push("/account");
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
            Сотрудники входят по корпоративному email. Клиенты входят по телефону или регистрируются с обязательным
            телефоном и email по желанию.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 sm:grid-cols-2">
        <ModeButton active={mode === "login"} onClick={() => switchMode("login")}>
          Войти
        </ModeButton>
        <ModeButton active={mode === "client-register"} onClick={() => switchMode("client-register")}>
          Регистрация клиента
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
            label="Email по желанию"
            id="client-email"
            type="email"
            placeholder="client@example.com"
            error={clientRegisterForm.formState.errors.email?.message}
            {...clientRegisterForm.register("email")}
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
