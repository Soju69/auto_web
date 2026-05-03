import { Container } from "@/components/layout/Container";

export default function PublicLoading() {
  return (
    <section className="pb-24">
      <Container>
        <div className="grid gap-6">
          <div className="h-72 animate-pulse rounded-[2.5rem] border border-white/10 bg-white/[0.045]" />
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.045]"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
