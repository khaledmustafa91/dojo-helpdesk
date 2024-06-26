import { notFound } from 'next/navigation';
import { API_BASE_URL } from '@/app/utils/constants';

async function getTicket(id) {
  const res = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }
  return res.json();
}
export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <h2>Ticket Details</h2>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
