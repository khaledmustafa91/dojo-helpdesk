import Link from 'next/link';
import { API_BASE_URL } from '../utils/constants';

async function getTickets() {
  const res = await fetch(`${API_BASE_URL}/tickets`, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function TicketsList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets &&
        tickets.map((ticket) => (
          <div key={ticket.id} className="card my-5">
            <Link href={`tickets/${ticket.id}`}>
              <h3>{ticket.title}</h3>
              <p>{ticket.body.slice(0, 200)}..</p>
              <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}
