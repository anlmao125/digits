import { Container, Row, Col } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import authOptions from '@/lib/authOptions';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.email;

  if (!currentUser) {
    return (
      <main>
        <Container className="py-3">
          <h2>You must be signed in to view contacts.</h2>
        </Container>
      </main>
    );
  }

  const contacts = await prisma.contact.findMany({
    where: { owner: currentUser },
    include: { notes: true },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h2>List Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCard contact={contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
export default ListPage;
