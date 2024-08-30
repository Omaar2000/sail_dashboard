const NotificationDetails = ({ text, title }) => {
  const content = JSON.parse(text?.notificationContent);
  console.log("content.title  :", content.title);
  console.log("content.body  :", content.body);

  return title === true ? content.title : content.body;
};

export default NotificationDetails;
