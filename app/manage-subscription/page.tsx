import Container from "../components/Container";

export default function ManageSubscription() {
  return (
    <main>
      <Container>
        <div className="py-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            Manage Subscription
          </h1>
          <p className="mt-6 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            {/* Add your subscription management content here */}
          </p>
        </div>
      </Container>
    </main>
  );
}
