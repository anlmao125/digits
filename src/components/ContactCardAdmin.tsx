'use client';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Contact } from '@/lib/validationSchemas';

interface Props {
  contact: Contact;
}

const ContactCardAdmin = ({ contact }: Props) => (
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
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
