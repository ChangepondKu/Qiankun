import { useEffect, useRef } from 'react';

export function useWebSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    const socketUrl = 'ws://localhost:3000';
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected:', socketUrl);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', event.data, error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    return () => {
      if (ws.current) {
        console.log('Closing WebSocket connection');
        ws.current.close();
      }
    };
  }, [onMessage]);

  return ws.current;
}
