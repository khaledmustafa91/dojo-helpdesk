'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTickets() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const ticket = {
      title,
      body,
      priority,
      user_email: userEmail,
    };

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });

    if (res.status == 201) {
      router.refresh();
      router.push('/tickets');
    }
  };
  return (
    <main className="text-center">
      <h2>Add a new Ticket</h2>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body</label>
        <textarea
          type="text"
          name="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Priority</label>
        <select
          id="priorities"
          name="priorities"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label>User email</label>
        <input
          type="email"
          name="user_email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button className="btn-primary" disabled={isLoading}>
          {isLoading && <span>Adding...</span>}
          {!isLoading && <span>Add Ticket</span>}
        </button>
      </form>
    </main>
  );
}
