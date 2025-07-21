'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

type ContactWithNotes = Contact & { notes: Note[] };

const ContactCardAdmin = ({ contact }: { contact: ContactWithNotes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} rounded />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {contact.lastName}
      </Card.Title>

      <ListGroup variant="flush">
        {contact.notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
