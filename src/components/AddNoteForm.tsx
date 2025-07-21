'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema, NoteFormData } from '@/lib/validationSchemas';

type Props = {
  contactId: number;
};

function AddNoteForm({ contactId }: Props) {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
      owner: currentUser,
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    await addNote(data);
    swal('Success', 'Your note has been added', 'success', { timer: 2000 });
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') return null;

  return (
    <Container className="pt-3">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Add Note</Form.Label>
                  <textarea
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                    rows={2}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>

                {/* Hidden fields */}
                <input type="hidden" {...register('contactId')} value={contactId} />
                <input type="hidden" {...register('owner')} value={currentUser} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Add Note
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" onClick={() => reset()} variant="warning">
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddNoteForm;
