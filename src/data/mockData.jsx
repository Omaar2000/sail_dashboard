// import {
//   AdminPanelSettingsOutlined,
//   LockOpenOutlined,
//   SecurityOutlined,
// } from "@mui/icons-material";
import ImageModal from "../components/ImageModal";
import { tokens } from "../theme";
import EditBtn from "../components/EditBtn";
import i18n from "../i18n";
import Flag from "react-world-flags";
import Control from "../components/Control";
import Ban from "../components/Ban";
import EditModal from "../components/editModal";
import AdminDropdown from "../components/adminDropdown";
import DetailsButton from "../components/Details";
import Verified from "../components/Verified";
import { Box, Typography } from "@mui/material";

// Ban and Unban for users and providers
// verify user and provider

export const userColumns = [
  {
    field: "id",
    headerName: i18n.t("ID"),

    flex: 0,
    cellClassName: "name-column--cell",
    filterable: true,
    filterOperators: ["contains"],
  },
  {
    field: "user_name",
    headerName: i18n.t("Name"),

    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "phone_number",
    headerName: i18n.t("Phone Number"),
    flex: 1,
    filterOperators: ["contains"],
    filterable: true,
  },
  {
    field: "email",
    headerName: i18n.t("Email"),

    flex: 1,
    filterable: true,
    filterOperators: ["contains"],
  },
  {
    field: "country_code",
    headerName: i18n.t("Country"),

    flex: 1,
    required: true,
    renderCell: ({ row: { country_code } }) => (
      <Flag
        code={country_code}
        style={{
          width: "40px",
          height: "25px",
          marginInlineEnd: "1rem",
          marginTop: "1rem",
        }}
      />
    ),
  },
  {
    headerName: i18n.t("Ban User"),

    flex: 1,
    renderCell: ({ row }) => (
      <Ban
        banEndpoint={`https://dev.sailgloble.com/admin/clients/ban/${row.id}`}
        unbanEndpoint={`https://dev.sailgloble.com/admin/clients/unban/${row.id}`}
        row={row}
      />
    ),
  },
];
export const providerColumns = [
  {
    field: "id",

    headerName: i18n.t("ID"),

    flex: 0,
    cellClassName: "name-column--cell",
  },
  {
    field: "full_name",
    headerName: i18n.t("Name"),

    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "phone_number",
    headerName: i18n.t("Phone Number"),

    flex: 1,
  },
  {
    field: "email",
    headerName: i18n.t("Email"),
    flex: 1,
  },
  {
    field: "status",
    headerName: i18n.t("Verify"),

    flex: 1,
    renderCell: ({ row }) => <Verified row={row} />,
  },
  {
    field: "details",
    headerName: i18n.t("Info"),
    flex: 1,
    renderCell: ({ row }) => <DetailsButton row={row} />,
  },

  {
    field: "Ban",
    headerName: i18n.t("Ban Provider"),

    flex: 1,
    renderCell: ({ row }) => (
      <Ban
        banEndpoint={`https://dev.sailgloble.com/admin/providers/ban/${row.id}`}
        unbanEndpoint={`https://dev.sailgloble.com/admin/providers/unban/${row.id}`}
        row={row}
      />
    ),
  },
];

export const categoriesColumns = [
  {
    field: "nameAr",
    headerName: i18n.t("Title (Arabic)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "nameEn",
    headerName: i18n.t("Title (English)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "type",
    headerName: i18n.t("Type"),
    flex: 1,
    renderCell: ({ row }) =>
      row.type === "FISHING"
        ? i18n.t("Fishing")
        : row.type === "JET_SKI"
        ? i18n.t("Jet Ski")
        : row.type === "TOUR"
        ? i18n.t("Touring")
        : i18n.t("Banana Boat"),
  },
  {
    field: "image_url",
    headerName: i18n.t("Image"),
    flex: 1,
    required: true,
    renderCell: ({ row }) => <ImageModal imageUrl={row.imageUrl} />,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editcategory" row={row} title={"Edit"} />
    ),
  },
];
export const coversColumns = [
  {
    field: "id",
    headerName: i18n.t("ID"),

    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "type",
    headerName: i18n.t("Type"),
    flex: 1,
  },
  {
    field: "image_url",
    headerName: i18n.t("Image"),
    flex: 1,
    required: true,
    renderCell: ({ row }) => <ImageModal imageUrl={row.image_url} />,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editcover" row={row} title={"Edit"} />
    ),
  },
];
export const featuresColumns = [
  {
    field: "nameAr",
    headerName: i18n.t("Name (Arabic)"),

    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "nameEn",
    headerName: i18n.t("Name (English)"),
    flex: 1,
  },
  {
    field: "imageUrl",
    headerName: i18n.t("Image"),
    flex: 1,
    required: true,
    renderCell: ({ row }) => <ImageModal imageUrl={row.imageUrl} />,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editfeature" row={row} title={"Edit"} />
    ),
  },
];
export const reviewsColumns = [
  { field: "boatId", headerName: i18n.t("Boat Id"), flex: 1 },
  { field: "reviewText", headerName: i18n.t("Review Text"), flex: 2 },
  { field: "starsCount", headerName: i18n.t("Stars Count"), flex: 1 },
  { field: "date", headerName: i18n.t("Date"), flex: 1 },
  { field: "byUser", headerName: i18n.t("By User"), flex: 1 },
];
export const reviewsData = [
  {
    id: 1,
    boatId: "B001",
    reviewText: "Great experience!",
    starsCount: 5,
    date: "2023-06-01",
    byUser: "User1",
  },

  {
    id: 2,
    boatId: "B002",
    reviewText: "Good service, but the boat was a bit small.",
    starsCount: 4,
    date: "2023-06-02",
    byUser: "User2",
  },
  {
    id: 3,
    boatId: "B003",
    reviewText: "Not satisfied with the trip.",
    starsCount: 2,
    date: "2023-06-03",
    byUser: "User3",
  },
  {
    id: 4,
    boatId: "B004",
    reviewText: "Excellent trip, friendly staff!",
    starsCount: 5,
    date: "2023-06-04",
    byUser: "User4",
  },
  {
    id: 5,
    boatId: "B005",
    reviewText: "Average experience.",
    starsCount: 3,
    date: "2023-06-05",
    byUser: "User5",
  },
];

export const supervisorsColumns = [
  { field: "name", headerName: i18n.t("Name"), flex: 1 },
  { field: "phone", headerName: i18n.t("Phone"), flex: 1 },
  { field: "email", headerName: i18n.t("Email"), flex: 1 },
];

export const supervisorsData = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Emily Johnson",
    phone: "+1122334455",
    email: "emily.johnson@example.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    phone: "+1223344556",
    email: "michael.brown@example.com",
  },
  {
    id: 5,
    name: "Linda Davis",
    phone: "+1334455667",
    email: "linda.davis@example.com",
  },
];

export const complaintsColumns = [
  { field: "id", headerName: i18n.t("ID"), flex: 1 },
  {
    field: "approvedBy",
    headerName: i18n.t("Approved By"),
    flex: 1,
    renderCell: ({ row }) => (
      <Typography
        mt="0.8rem"
        fontSize="16px"
        fontWeight="bold"
        // color="#83ff63"
      >
        {row.approvedBy !== null ? row.approvedBy : "Not Approved"}
      </Typography>
    ),
  },
  // {
  //   field: "assign",
  //   headerName: i18n.t("Assign"),
  //   flex: 1,
  //   renderCell: ({ row }) => <AdminDropdown />,
  // },
  {
    field: "status",
    headerName: i18n.t("Respond"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/respond" row={row} title={"Respond"} />
    ),
  },
  // {
  //   field: "details",
  //   headerName: i18n.t("Details"),
  //   flex: 1,
  //   renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
  // },
];

export const complaintsData = [
  {
    id: 1,
    orderId: "O001",
    date: "2023-06-01",
    user: "User1",
    complaint: "Late arrival of the boat.",
  },
  {
    id: 2,
    orderId: "O002",
    date: "2023-06-02",
    user: "User2",
    complaint: "Unfriendly staff.",
  },
  {
    id: 3,
    orderId: "O003",
    date: "2023-06-03",
    user: "User3",
    complaint: "Boat was not clean.",
  },
  {
    id: 4,
    orderId: "O004",
    date: "2023-06-04",
    user: "User4",
    complaint: "Noisy environment.",
  },
  {
    id: 5,
    orderId: "O005",
    date: "2023-06-05",
    user: "User5",
    complaint: "Poor service.",
  },
];

export const payoutsColumns = [
  { field: "paymentMethod", headerName: i18n.t("Payment Method"), flex: 1 },
  { field: "amount", headerName: i18n.t("Amount"), type: "number", flex: 1 },
  { field: "user", headerName: i18n.t("User"), flex: 1 },
  { field: "status", headerName: i18n.t("Status"), flex: 1 },
];
export const payoutsData = [
  {
    id: 1,
    paymentMethod: "Credit Card",
    amount: 250.0,
    user: "User1",
    status: "Completed",
  },
  {
    id: 2,
    paymentMethod: "PayPal",
    amount: 500.0,
    user: "User2",
    status: "Pending",
  },
  {
    id: 3,
    paymentMethod: "Bank Transfer",
    amount: 150.0,
    user: "User3",
    status: "Completed",
  },
  {
    id: 4,
    paymentMethod: "Credit Card",
    amount: 300.0,
    user: "User4",
    status: "Failed",
  },
  {
    id: 5,
    paymentMethod: "PayPal",
    amount: 450.0,
    user: "User5",
    status: "Completed",
  },
];

// export const roviderRequestsColumns = [
//   { field: "providerId", headerName: "ID", flex: 1 },
//   // { field: "assignedTo", headerName: "Assigned To", flex: 1 },
//   {
//     field: "details",
//     headerName: "Details",
//     flex: 1,
//     renderCell: ({ row }) => <EditBtn to="/editcover" row={row} title={"Edit"}/>,
//   },
// ];
export const boatRequestsColumns = [
  { field: "id", headerName: i18n.t("ID"), flex: 1 },
  {
    field: "approvedBy",
    headerName: i18n.t("Approved By"),
    flex: 1,
    renderCell: ({ row }) => (
      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
        <h3 style={{ marginBottom: "4px" }}>
          {row.approvedBy !== null ? row.approvedBy : "Not Approved"}
        </h3>
      </Box>
    ),
  },
  // {
  //   field: "assign",
  //   headerName: i18n.t("Assign"),
  //   flex: 1,
  //   renderCell: ({ row }) => <AdminDropdown />,
  // },
  {
    field: "status",
    headerName: i18n.t("Verify"),
    flex: 1,
    renderCell: ({ row }) => (
      <Control
        endpoint={`https://dev.sailgloble.com/admin/provider-requests/approve/boat/${row.requestTypeId}`}
        row={row}
      />
    ),
  },
  // {
  //   field: "details",
  //   headerName: i18n.t("Details"),
  //   flex: 1,
  //   renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
  // },
];
export const usersRequestsColumns = [
  { field: "id", headerName: i18n.t("ID"), flex: 1 },

  { field: "requestedAmount", headerName: i18n.t("Requested Amount"), flex: 1 },
  {
    field: "paidAt",
    headerName: i18n.t("Paid At"),
    flex: 1,
    renderCell: ({ row }) => (
      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
        <h3 style={{ marginBottom: "4px" }}>
          {row.paidAt !== null ? row.paidAt : i18n.t("Not Paid")}
        </h3>
      </Box>
    ),
  },
  // {
  //   field: "assign",
  //   headerName: i18n.t("Assign"),
  //   flex: 1,
  //   renderCell: ({ row }) => <AdminDropdown />,
  // },
  {
    field: "status",
    headerName: i18n.t("Verify"),
    flex: 1,
    renderCell: ({ row }) => (
      <Control
        endpoint={`https://dev.sailgloble.com/admin/user-requests/approve/payout/${row.requestTypeId}`}
        row={row}
      />
    ),
  },
  // {
  //   field: "details",
  //   headerName: i18n.t("Details"),
  //   flex: 1,
  //   renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
  // },
];
export const payoutsRequestsColumns = [
  { field: "id", headerName: i18n.t("ID"), flex: 1 },
  {
    field: "approvedBy",
    headerName: i18n.t("Approved By"),
    flex: 1,
    renderCell: ({ row }) => (
      <Box display={"flex"} justifyContent={"start"} alignItems={"center"}>
        <h3 style={{ marginBottom: "4px" }}>
          {row.approvedBy !== null ? row.approvedBy : "Not Approved"}
        </h3>
      </Box>
    ),
  },
  // {
  //   field: "assign",
  //   headerName: i18n.t("Assign"),
  //   flex: 1,
  //   renderCell: ({ row }) => <AdminDropdown />,
  // },
  {
    field: "status",
    headerName: i18n.t("Verify"),
    flex: 1,
    renderCell: ({ row }) => (
      <Control
        endpoint={`https://dev.sailgloble.com/admin/provider-requests/approve/payout/${row.requestTypeId}`}
        row={row}
      />
    ),
  },
  // {
  //   field: "details",
  //   headerName: i18n.t("Details"),
  //   flex: 1,
  //   renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
  // },
];

export const providerRequestsColumns = [
  { field: "id", headerName: i18n.t("ID"), flex: 1 },
  {
    field: "approvedBy",
    headerName: i18n.t("Approved By"),
    flex: 1,
    // renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
  },

  {
    field: "status",
    headerName: i18n.t("Verify"),

    flex: 1,
    renderCell: ({ row }) => (
      <Control
        endpoint={`https://dev.sailgloble.com/admin/provider-requests/approve/account/${row.requestTypeId}`}
        row={row}
      />
    ),
  },
  // {
  //   field: "details",
  //   headerName: i18n.t("Details"),
  //   flex: 1,
  //   renderCell: ({ row }) => <EditBtn to="/editcover" row={row} title={"Details"} />,
  // },
];
// export const boatsColumns = [
//   { field: "providerId", headerName: i18n.t("ID"), flex: 1 },
//   {
//     field: "assignedTo",
//     headerName: i18n.t("Assigned To"),
//     flex: 1,
//     // renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
//   },
//   {
//     field: "assign",
//     headerName: i18n.t("Assign"),
//     flex: 1,
//     renderCell: ({ row }) => <AdminDropdown />,
//   },
//   {
//     field: "status",
//     headerName: i18n.t("Verify"),

//     flex: 1,
//     renderCell: ({ row }) => <Control row={row} />,
//   },
//   {
//     field: "details",
//     headerName: i18n.t("Details"),
//     flex: 1,
//     renderCell: ({ row }) => <EditBtn to="/editcover" row={row} />,
//   },
// ];

export const providerRequestsData = [
  {
    id: 1,
    name: "Provider A",
    photo: "https://via.placeholder.com/150",
    country: "Country A",
    email: "providerA@example.com",
    phone: "+1234567890",
  },
  {
    id: 2,
    name: "Provider B",
    photo: "https://via.placeholder.com/150",
    country: "Country B",
    email: "providerB@example.com",
    phone: "+0987654321",
  },
  {
    id: 3,
    name: "Provider C",
    photo: "https://via.placeholder.com/150",
    country: "Country C",
    email: "providerC@example.com",
    phone: "+1122334455",
  },
  {
    id: 4,
    name: "Provider D",
    photo: "https://via.placeholder.com/150",
    country: "Country D",
    email: "providerD@example.com",
    phone: "+1223344556",
  },
  {
    id: 5,
    name: "Provider E",
    photo: "https://via.placeholder.com/150",
    country: "Country E",
    email: "providerE@example.com",
    phone: "+1334455667",
  },
];

export const featuresListColumns = [
  {
    field: "icon",
    headerName: i18n.t("Icon"),
    flex: 1,
    renderCell: (params) => <img src={params.value} alt="Icon" />,
  },
  { field: "nameAr", headerName: i18n.t("Name AR"), flex: 1 },
  { field: "nameEn", headerName: i18n.t("Name EN"), flex: 1 },
];

export const featuresListData = [
  {
    id: 1,
    icon: "https://via.placeholder.com/150",
    nameAr: "ميزة 1",
    nameEn: "Feature 1",
  },
  {
    id: 2,
    icon: "https://via.placeholder.com/150",
    nameAr: "ميزة 2",
    nameEn: "Feature 2",
  },
  {
    id: 3,
    icon: "https://via.placeholder.com/150",
    nameAr: "ميزة 3",
    nameEn: "Feature 3",
  },
  {
    id: 4,
    icon: "https://via.placeholder.com/150",
    nameAr: "ميزة 4",
    nameEn: "Feature 4",
  },
  {
    id: 5,
    icon: "https://via.placeholder.com/150",
    nameAr: "ميزة 5",
    nameEn: "Feature 5",
  },
];
export const notificationsColumns = [
  { field: "userId", headerName: i18n.t("IddD"), flex: 1 },
  { field: "createdAt", headerName: i18n.t("Date"), flex: 1 },
  { field: "isRead", headerName: i18n.t("Read?"), flex: 1 },
  {
    field: "title",
    headerName: i18n.t("Title"),
    flex: 1,
    valueGetter: (params) => {
      const content = JSON.parse(params.row.notificationContent);
      return content.title || "";
    },
  },
  {
    field: "body",
    headerName: i18n.t("Message"),
    flex: 1,
    valueGetter: (params) => {
      const content = JSON.parse(params.row.notificationContent);
      return content.body || "";
    },
  },
  { field: "orderId", headerName: i18n.t("Order ID"), flex: 1 },
  {
    field: "providerTransactionId",
    headerName: i18n.t("Transaction ID"),
    flex: 1,
  },
];

export const transactionsColumns = [
  { field: "provider", headerName: i18n.t("Provider ID"), flex: 1 },
  { field: "createdAt", headerName: i18n.t("Date"), flex: 1 },
  { field: "amount", headerName: i18n.t("Amount"), flex: 1 },
  {
    field: "status",
    headerName: i18n.t("Status"),
    flex: 1,
  },
  { field: "orderId", headerName: i18n.t("Order ID"), flex: 1 },
  {
    field: "providerTransactionId",
    headerName: i18n.t("Transaction ID"),
    flex: 1,
  },
  // { field: "provider", headerName: i18n.t("Provider"), flex: 1 },
];

export const transactionsData = [
  {
    id: 1,
    provider: 1,
    orderId: "TRX001",
    createdAt: "2023-06-01",
    amountInCents: 100.0,
    providerTransactionId: "T001",
    status: "FAILED",
    user: "User1",
    // provider: "ProviderA",
  },
  {
    id: 2,
    provider: 1,
    orderId: "TRX001",
    createdAt: "2023-06-01",
    amountInCents: 100.0,
    providerTransactionId: "T001",
    status: "SUCCESS",
    user: "User1",
    // provider: "ProviderA",
  },
  {
    id: 3,
    provider: 1,
    orderId: "TRX001",
    createdAt: "2023-06-01",
    amountInCents: 100.0,
    providerTransactionId: "T001",
    status: "PENDNG",
    // tripType: "Boat",
    user: "User1",
    // provider: "ProviderA",
  },
  // {
  //   provider: 1,
  //   orderId: "TRX001",
  //   createdAt: "2023-06-01",
  //   amountInCents: 100.0,
  //   providerTransactionId: "T001",
  //   tripType: "Boat",
  //   user: "User1",
  //   // provider: "ProviderA",
  // },
  // {
  //   provider: 1,
  //   orderId: "TRX001",
  //   createdAt: "2023-06-01",
  //   amountInCents: 100.0,
  //   providerTransactionId: "T001",
  //   tripType: "Boat",
  //   user: "User1",
  //   // provider: "ProviderA",
  // },
  // {
  //   provider: 1,
  //   orderId: "TRX001",
  //   createdAt: "2023-06-01",
  //   amountInCents: 100.0,
  //   providerTransactionId: "T001",
  //   tripType: "Boat",
  //   user: "User1",
  //   // provider: "ProviderA",
  // },
  // {
  //   id: 2,
  //   trxId: "TRX002",
  //   date: "2023-06-02",
  //   amount: 200.0,
  //   tripId: "T002",
  //   tripType: "Banana Boat",
  //   user: "User2",
  //   provider: "ProviderB",
  // },
  // {
  //   id: 3,
  //   trxId: "TRX003",
  //   date: "2023-06-03",
  //   amount: 150.0,
  //   tripId: "T003",
  //   tripType: "Boat",
  //   user: "User3",
  //   provider: "ProviderC",
  // },
  // {
  //   id: 4,
  //   trxId: "TRX004",
  //   date: "2023-06-04",
  //   amount: 180.0,
  //   tripId: "T004",
  //   tripType: "Banana Boat",
  //   user: "User4",
  //   provider: "ProviderA",
  // },
  // {
  //   id: 5,
  //   trxId: "TRX005",
  //   date: "2023-06-05",
  //   amount: 220.0,
  //   tripId: "T005",
  //   tripType: "Boat",
  //   user: "User5",
  //   provider: "ProviderB",
  // },
];

export const pathsColumns = [
  {
    field: "title_ar",
    headerName: i18n.t("Title (Arabic)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "title_en",
    headerName: i18n.t("Title (English)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editpath" row={row} title={"Edit"} />
    ),
  },
];
export const countriesColumns = [
  {
    field: "title_ar",
    headerName: i18n.t("Title (Arabic)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "title_en",
    headerName: i18n.t("Title (English)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editcountry" row={row} title={"Edit"} />
    ),
  },
];
export const citiesColumns = [
  {
    field: "title_ar",
    headerName: i18n.t("Title (Arabic)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "title_en",
    headerName: i18n.t("Title (English)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "countryId",
    headerName: i18n.t("Country ID"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editcity" row={row} title={"Edit"} />
    ),
  },
];
export const codesColumns = [
  {
    field: "title_ar",
    headerName: i18n.t("Title (Arabic)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "title_en",
    headerName: i18n.t("Title (English)"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "country_code",
    headerName: i18n.t("Country Code"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
  },
  {
    field: "flag",
    headerName: i18n.t("Flag"),
    flex: 1,
    cellClassName: "name-column--cell",
    required: true,
    renderCell: ({ row }) => (
      <Flag
        code={row.flag}
        style={{
          width: "40px",
          height: "25px",
          margin: "10px",
          // marginInlineEnd: "1rem",
        }}
        row={row}
      />
    ),
  },
  {
    field: "edit",
    headerName: i18n.t("Edit"),
    flex: 1,
    renderCell: ({ row }) => (
      <EditBtn to="/editcode" row={row} title={"Edit"} />
    ),
  },
];
export const countries = [
  { name: "Afghanistan", code: "AF", phoneCode: "+93" },
  { name: "Albania", code: "AL", phoneCode: "+355" },
  { name: "Algeria", code: "DZ", phoneCode: "+213" },
  { name: "Andorra", code: "AD", phoneCode: "+376" },
  { name: "Angola", code: "AO", phoneCode: "+244" },
  { name: "Antigua and Barbuda", code: "AG", phoneCode: "+1-268" },
  { name: "Argentina", code: "AR", phoneCode: "+54" },
  { name: "Armenia", code: "AM", phoneCode: "+374" },
  { name: "Australia", code: "AU", phoneCode: "+61" },
  { name: "Austria", code: "AT", phoneCode: "+43" },
  { name: "Azerbaijan", code: "AZ", phoneCode: "+994" },
  { name: "Bahamas", code: "BS", phoneCode: "+1-242" },
  { name: "Bahrain", code: "BH", phoneCode: "+973" },
  { name: "Bangladesh", code: "BD", phoneCode: "+880" },
  { name: "Barbados", code: "BB", phoneCode: "+1-246" },
  { name: "Belarus", code: "BY", phoneCode: "+375" },
  { name: "Belgium", code: "BE", phoneCode: "+32" },
  { name: "Belize", code: "BZ", phoneCode: "+501" },
  { name: "Benin", code: "BJ", phoneCode: "+229" },
  { name: "Bhutan", code: "BT", phoneCode: "+975" },
  { name: "Bolivia", code: "BO", phoneCode: "+591" },
  { name: "Bosnia and Herzegovina", code: "BA", phoneCode: "+387" },
  { name: "Botswana", code: "BW", phoneCode: "+267" },
  { name: "Brazil", code: "BR", phoneCode: "+55" },
  { name: "Brunei", code: "BN", phoneCode: "+673" },
  { name: "Bulgaria", code: "BG", phoneCode: "+359" },
  { name: "Burkina Faso", code: "BF", phoneCode: "+226" },
  { name: "Burundi", code: "BI", phoneCode: "+257" },
  { name: "Cabo Verde", code: "CV", phoneCode: "+238" },
  { name: "Cambodia", code: "KH", phoneCode: "+855" },
  { name: "Cameroon", code: "CM", phoneCode: "+237" },
  { name: "Canada", code: "CA", phoneCode: "+1" },
  { name: "Central African Republic", code: "CF", phoneCode: "+236" },
  { name: "Chad", code: "TD", phoneCode: "+235" },
  { name: "Chile", code: "CL", phoneCode: "+56" },
  { name: "China", code: "CN", phoneCode: "+86" },
  { name: "Colombia", code: "CO", phoneCode: "+57" },
  { name: "Comoros", code: "KM", phoneCode: "+269" },
  { name: "Congo, Democratic Republic of the", code: "CD", phoneCode: "+243" },
  { name: "Congo, Republic of the", code: "CG", phoneCode: "+242" },
  { name: "Costa Rica", code: "CR", phoneCode: "+506" },
  { name: "Croatia", code: "HR", phoneCode: "+385" },
  { name: "Cuba", code: "CU", phoneCode: "+53" },
  { name: "Cyprus", code: "CY", phoneCode: "+357" },
  { name: "Czech Republic", code: "CZ", phoneCode: "+420" },
  { name: "Denmark", code: "DK", phoneCode: "+45" },
  { name: "Djibouti", code: "DJ", phoneCode: "+253" },
  { name: "Dominica", code: "DM", phoneCode: "+1-767" },
  { name: "Dominican Republic", code: "DO", phoneCode: "+1-809" },
  { name: "Ecuador", code: "EC", phoneCode: "+593" },
  { name: "Egypt", code: "EG", phoneCode: "+20" },
  { name: "El Salvador", code: "SV", phoneCode: "+503" },
  { name: "Equatorial Guinea", code: "GQ", phoneCode: "+240" },
  { name: "Eritrea", code: "ER", phoneCode: "+291" },
  { name: "Estonia", code: "EE", phoneCode: "+372" },
  { name: "Eswatini", code: "SZ", phoneCode: "+268" },
  { name: "Ethiopia", code: "ET", phoneCode: "+251" },
  { name: "Fiji", code: "FJ", phoneCode: "+679" },
  { name: "Finland", code: "FI", phoneCode: "+358" },
  { name: "France", code: "FR", phoneCode: "+33" },
  { name: "Gabon", code: "GA", phoneCode: "+241" },
  { name: "Gambia", code: "GM", phoneCode: "+220" },
  { name: "Georgia", code: "GE", phoneCode: "+995" },
  { name: "Germany", code: "DE", phoneCode: "+49" },
  { name: "Ghana", code: "GH", phoneCode: "+233" },
  { name: "Greece", code: "GR", phoneCode: "+30" },
  { name: "Grenada", code: "GD", phoneCode: "+1-473" },
  { name: "Guatemala", code: "GT", phoneCode: "+502" },
  { name: "Guinea", code: "GN", phoneCode: "+224" },
  { name: "Guinea-Bissau", code: "GW", phoneCode: "+245" },
  { name: "Guyana", code: "GY", phoneCode: "+592" },
  { name: "Haiti", code: "HT", phoneCode: "+509" },
  { name: "Honduras", code: "HN", phoneCode: "+504" },
  { name: "Hungary", code: "HU", phoneCode: "+36" },
  { name: "Iceland", code: "IS", phoneCode: "+354" },
  { name: "India", code: "IN", phoneCode: "+91" },
  { name: "Indonesia", code: "ID", phoneCode: "+62" },
  { name: "Iran", code: "IR", phoneCode: "+98" },
  { name: "Iraq", code: "IQ", phoneCode: "+964" },
  { name: "Ireland", code: "IE", phoneCode: "+353" },
  { name: "Israel", code: "IL", phoneCode: "+972" },
  { name: "Italy", code: "IT", phoneCode: "+39" },
  { name: "Jamaica", code: "JM", phoneCode: "+1-876" },
  { name: "Japan", code: "JP", phoneCode: "+81" },
  { name: "Jordan", code: "JO", phoneCode: "+962" },
  { name: "Kazakhstan", code: "KZ", phoneCode: "+7" },
  { name: "Kenya", code: "KE", phoneCode: "+254" },
  { name: "Kiribati", code: "KI", phoneCode: "+686" },
  { name: "Korea, North", code: "KP", phoneCode: "+850" },
  { name: "Korea, South", code: "KR", phoneCode: "+82" },
  { name: "Kosovo", code: "XK", phoneCode: "+383" },
  { name: "Kuwait", code: "KW", phoneCode: "+965" },
  { name: "Kyrgyzstan", code: "KG", phoneCode: "+996" },
  { name: "Laos", code: "LA", phoneCode: "+856" },
  { name: "Latvia", code: "LV", phoneCode: "+371" },
  { name: "Lebanon", code: "LB", phoneCode: "+961" },
  { name: "Lesotho", code: "LS", phoneCode: "+266" },
  { name: "Liberia", code: "LR", phoneCode: "+231" },
  { name: "Libya", code: "LY", phoneCode: "+218" },
  { name: "Liechtenstein", code: "LI", phoneCode: "+423" },
  { name: "Lithuania", code: "LT", phoneCode: "+370" },
  { name: "Luxembourg", code: "LU", phoneCode: "+352" },
  { name: "Madagascar", code: "MG", phoneCode: "+261" },
  { name: "Malawi", code: "MW", phoneCode: "+265" },
  { name: "Malaysia", code: "MY", phoneCode: "+60" },
  { name: "Maldives", code: "MV", phoneCode: "+960" },
  { name: "Mali", code: "ML", phoneCode: "+223" },
  { name: "Malta", code: "MT", phoneCode: "+356" },
  { name: "Marshall Islands", code: "MH", phoneCode: "+692" },
  { name: "Mauritania", code: "MR", phoneCode: "+222" },
  { name: "Mauritius", code: "MU", phoneCode: "+230" },
  { name: "Mexico", code: "MX", phoneCode: "+52" },
  { name: "Micronesia", code: "FM", phoneCode: "+691" },
  { name: "Moldova", code: "MD", phoneCode: "+373" },
  { name: "Monaco", code: "MC", phoneCode: "+377" },
  { name: "Mongolia", code: "MN", phoneCode: "+976" },
  { name: "Montenegro", code: "ME", phoneCode: "+382" },
  { name: "Morocco", code: "MA", phoneCode: "+212" },
  { name: "Mozambique", code: "MZ", phoneCode: "+258" },
  { name: "Myanmar", code: "MM", phoneCode: "+95" },
  { name: "Namibia", code: "NA", phoneCode: "+264" },
  { name: "Nauru", code: "NR", phoneCode: "+674" },
  { name: "Nepal", code: "NP", phoneCode: "+977" },
  { name: "Netherlands", code: "NL", phoneCode: "+31" },
  { name: "New Zealand", code: "NZ", phoneCode: "+64" },
  { name: "Nicaragua", code: "NI", phoneCode: "+505" },
  { name: "Niger", code: "NE", phoneCode: "+227" },
  { name: "Nigeria", code: "NG", phoneCode: "+234" },
  { name: "North Macedonia", code: "MK", phoneCode: "+389" },
  { name: "Norway", code: "NO", phoneCode: "+47" },
  { name: "Oman", code: "OM", phoneCode: "+968" },
  { name: "Pakistan", code: "PK", phoneCode: "+92" },
  { name: "Palau", code: "PW", phoneCode: "+680" },
  { name: "Palestine", code: "PS", phoneCode: "+970" },
  { name: "Panama", code: "PA", phoneCode: "+507" },
  { name: "Papua New Guinea", code: "PG", phoneCode: "+675" },
  { name: "Paraguay", code: "PY", phoneCode: "+595" },
  { name: "Peru", code: "PE", phoneCode: "+51" },
  { name: "Philippines", code: "PH", phoneCode: "+63" },
  { name: "Poland", code: "PL", phoneCode: "+48" },
  { name: "Portugal", code: "PT", phoneCode: "+351" },
  { name: "Qatar", code: "QA", phoneCode: "+974" },
  { name: "Romania", code: "RO", phoneCode: "+40" },
  { name: "Russia", code: "RU", phoneCode: "+7" },
  { name: "Rwanda", code: "RW", phoneCode: "+250" },
  { name: "Saint Kitts and Nevis", code: "KN", phoneCode: "+1-869" },
  { name: "Saint Lucia", code: "LC", phoneCode: "+1-758" },
  { name: "Saint Vincent and the Grenadines", code: "VC", phoneCode: "+1-784" },
  { name: "Samoa", code: "WS", phoneCode: "+685" },
  { name: "San Marino", code: "SM", phoneCode: "+378" },
  { name: "Sao Tome and Principe", code: "ST", phoneCode: "+239" },
  { name: "Saudi Arabia", code: "SA", phoneCode: "+966" },
  { name: "Senegal", code: "SN", phoneCode: "+221" },
  { name: "Serbia", code: "RS", phoneCode: "+381" },
  { name: "Seychelles", code: "SC", phoneCode: "+248" },
  { name: "Sierra Leone", code: "SL", phoneCode: "+232" },
  { name: "Singapore", code: "SG", phoneCode: "+65" },
  { name: "Slovakia", code: "SK", phoneCode: "+421" },
  { name: "Slovenia", code: "SI", phoneCode: "+386" },
  { name: "Solomon Islands", code: "SB", phoneCode: "+677" },
  { name: "Somalia", code: "SO", phoneCode: "+252" },
  { name: "South Africa", code: "ZA", phoneCode: "+27" },
  { name: "Spain", code: "ES", phoneCode: "+34" },
  { name: "Sri Lanka", code: "LK", phoneCode: "+94" },
  { name: "Sudan", code: "SD", phoneCode: "+249" },
  { name: "Suriname", code: "SR", phoneCode: "+597" },
  { name: "Sweden", code: "SE", phoneCode: "+46" },
  { name: "Switzerland", code: "CH", phoneCode: "+41" },
  { name: "Syria", code: "SY", phoneCode: "+963" },
  { name: "Taiwan", code: "TW", phoneCode: "+886" },
  { name: "Tajikistan", code: "TJ", phoneCode: "+992" },
  { name: "Tanzania", code: "TZ", phoneCode: "+255" },
  { name: "Thailand", code: "TH", phoneCode: "+66" },
  { name: "Timor-Leste", code: "TL", phoneCode: "+670" },
  { name: "Togo", code: "TG", phoneCode: "+228" },
  { name: "Tonga", code: "TO", phoneCode: "+676" },
  { name: "Trinidad and Tobago", code: "TT", phoneCode: "+1-868" },
  { name: "Tunisia", code: "TN", phoneCode: "+216" },
  { name: "Turkey", code: "TR", phoneCode: "+90" },
  { name: "Turkmenistan", code: "TM", phoneCode: "+993" },
  { name: "Tuvalu", code: "TV", phoneCode: "+688" },
  { name: "Uganda", code: "UG", phoneCode: "+256" },
  { name: "Ukraine", code: "UA", phoneCode: "+380" },
  { name: "United Arab Emirates", code: "AE", phoneCode: "+971" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44" },
  { name: "United States", code: "US", phoneCode: "+1" },
  { name: "Uruguay", code: "UY", phoneCode: "+598" },
  { name: "Uzbekistan", code: "UZ", phoneCode: "+998" },
  { name: "Vanuatu", code: "VU", phoneCode: "+678" },
  { name: "Vatican City", code: "VA", phoneCode: "+379" },
  { name: "Venezuela", code: "VE", phoneCode: "+58" },
  { name: "Vietnam", code: "VN", phoneCode: "+84" },
  { name: "Yemen", code: "YE", phoneCode: "+967" },
  { name: "Zambia", code: "ZM", phoneCode: "+260" },
  { name: "Zimbabwe", code: "ZW", phoneCode: "+263" },
];

export const mockDataTeam = [
  // {
  //   id: "NO ROW DATA",
  //   name: "NO ROW DATA",
  //   email: "NO ROW DATA",
  //   age: "NO ROW DATA",
  //   phone: "NO ROW DATA",
  //   access: "NO ROW DATA",
  //   study: "NO ROW DATA",
  // },
  {
    id: 1,
    name: "yosef sherif",
    email: "youssef123@gmail.com",
    age: 13,
    phone: "01206809456",
    access: "manager",
    study: "student",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Mohamed mehani",
    email: "mohamedmehani@gmail.com",
    age: 13,
    phone: "01221885346",
    access: "manager",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 10,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 11,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 12,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 13,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 14,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 15,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 16,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 17,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 18,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 19,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 20,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 21,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 22,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 23,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 24,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 25,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 26,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 27,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 28,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 29,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 30,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 31,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
  {
    id: 32,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    burger: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];
