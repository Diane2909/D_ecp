import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001';

export default function ModalChat({ setChatting, userId }) {
  const [open, setOpen] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  
  
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, { query: { userId } });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      newSocket.emit('authenticate', { userId });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      
      socket.on('chat message', handleNewMessage);

      return () => {
        socket.off('chat message', handleNewMessage);
      };
    }
  }, [socket]);

  
  const sendMessage = e => {
    e.preventDefault();
    const message = e.target.elements.msg.value;
    if (message.trim() && currentRoom) {
      socket.emit('chat message', message, currentRoom);
      setMessages([...messages, message]);
      e.target.elements.msg.value = '';
    }
  };

  
  const handleClose = () => {
    setChatting(false);
    setOpen(false);
    if (currentRoom) {
      socket.emit('leave_room', currentRoom);
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div className="mt-3 text-center sm:mt-0 sm:text-left">
      {}
      <div className="message-display-container" style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: 'white', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        {messages.map((message, index) => (
          <p key={index} style={{ margin: '5px 0' }}>{message}</p>
        ))}
        <div ref={messageEndRef} />
      </div>
      {}
      <div className="mt-2">
        <form onSubmit={sendMessage}>
          <input
            id="msg"
            name="msg"
            autoComplete="off"
            placeholder="Write a message..."
            style={{ marginRight: '10px' }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
