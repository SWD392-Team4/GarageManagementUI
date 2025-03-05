export const fetchNotifications = async () => {
  return [
    {
      id: 1,
      sender: "John Doe",
      time: "5 min",
      message: "New ticket Added",
      avatar: "/assets/images/user/avatar-1.jpg",
      isNew: true,
    },
    {
      id: 2,
      sender: "Joseph William",
      time: "10 min",
      message: "Purchased New Theme and made payment",
      avatar: "/assets/images/user/avatar-2.jpg",
      isNew: true,
    },
    {
      id: 3,
      sender: "Sara Soudein",
      time: "51 min",
      message: "currently login",
      avatar: "/assets/images/user/avatar-3.jpg",
      isNew: false,
    },
    {
      id: 4,
      sender: "Joseph William",
      time: "15 min",
      message: "New ticket Added",
      avatar: "/assets/images/user/avatar-4.jpg",
      isNew: false,
    },
    {
      id: 5,
      sender: "Sara Soudein",
      time: "18 min",
      message: "currently login",
      avatar: "/assets/images/user/avatar-5.jpg",
      isNew: false,
    },
  ];
};
