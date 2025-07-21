'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@prisma/client';
import Link from 'next/link';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

// Define the combined type
type ContactWithNotes = Contact & { notes: Note[] };

const ContactCard = ({ contact }: { contact: ContactWithNotes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} rounded />
    </Card.Header>

    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>

    <ListGroup variant="flush">
      {contact.notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>

    <Card.Body>
      <AddNoteForm contactId={contact.id} />
    </Card.Body>

    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
