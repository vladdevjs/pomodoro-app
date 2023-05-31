export default function useNotification() {
  const showNotification = (title, options) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (
      'Notification' in window &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      });
    }
  };

  return {
    showNotification,
  };
}
