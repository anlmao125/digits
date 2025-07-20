import { getServerSession } from 'next-auth/next';
import { type Session } from 'next-auth'; // Make sure this is imported
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';
import { Contact } from '@/lib/validationSchemas';
import { notFound } from 'next/navigation';

export default async function EditContactPage({ params }: { params: { id: string | string[] } }) {
  const session = (await getServerSession(authOptions)) as Session | null;

  // Manually ensure shape for your app:
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  if (Number.isNaN(id)) {
    return notFound();
  }

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact as Contact} />
    </main>
  );
}
