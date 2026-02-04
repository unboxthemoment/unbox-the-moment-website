import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>

        {config.resend.customerServiceEmail && (
          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl">Need Help?</h2>
              <p className="text-gray-600">
                If you have any questions or need assistance, please don&apos;t hesitate to reach out to our customer
                service team.
              </p>
              <div className="mt-4">
                <a
                  href={`mailto:${config.resend.customerServiceEmail}`}
                  className="btn btn-primary"
                >
                  Contact Customer Service
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${config.resend.customerServiceEmail}`}
                    className="link link-primary"
                  >
                    {config.resend.customerServiceEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
