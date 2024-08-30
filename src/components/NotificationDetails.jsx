const NotificationDetails = ({ text, title }) => {
  // const content = JSON.parse(text?.notificationContent);
  console.log("content.title  :", title);
  // console.log("content.body  :", content.body);

  return title === true ? title : true;
};

export default NotificationDetails;
