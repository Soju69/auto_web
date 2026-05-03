import { LoginForm } from "@/components/forms/LoginForm";
import { Container } from "@/components/layout/Container";

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-screen items-center py-16">
      <Container className="flex justify-center">
        <LoginForm />
      </Container>
    </section>
  );
}
