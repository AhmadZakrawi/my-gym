import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import DatePicker from "../manage/components/DatePicker.jsx";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  LinearProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Table,
  TableContainer,
} from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import { CategoryScale, TimeScale } from "chart.js";
import Chart from "chart.js/auto";
import { useMembers } from "../hooks/useMembers.jsx";
import { useMemberships } from "../hooks/useMemberships.jsx";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

Chart.register(CategoryScale, TimeScale);

export default function ReportsCenter() {
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("month"); // Default filter option
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Default selected month
  const [allMembers, setAllMembers] = React.useState([]);
  const [allMemberships, setAllMemberships] = React.useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const { getMembers, getLoading: getMembersLoading, getError } = useMembers();

  const { getAllMemberships, getLoading: getMembershipsLoading } =
    useMemberships();

  const getAllMembers = async () => {
    let members = await getMembers();

    members = members.map((member) => {
      return {
        ...member,
        registered: moment(new Date(member.registered)),
      };
    });
    setAllMembers(members);
  };

  const getAllTheMemberships = async () => {
    let memberships = await getAllMemberships();

    setAllMemberships(memberships);
  };

  React.useEffect(() => {
    getAllMembers();
    getAllTheMemberships();
  }, []);

  const salesChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Data",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const getMembershipsData = () => {
    const labels = allMemberships.map((membership) => membership.name)
    const data = labels.map((label) => {
      const data = allMembers.filter((member) => member["membership.name"] === label).length
      return data
    })

    console.log("labels: ", labels, "data: ", data)

    return {
      labels,
      datasets: [
        {data}
      ]
    }
  }

  const membershipPieChartData = {
    labels: ["Regular", "Premium", "VIP"],
    datasets: [
      {
        data: [30, 45, 25],
      },
    ],
  };

  const gymStatistics = [
    { title: "Active Classes", value: 15 },
    { title: "Cancelled Memberships", value: 10 },
  ];

  const membershipsChartData = {
    labels: ["Existing", "Cancelled", "Expired", "New"],
    datasets: [
      {
        label: "Memberships",
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
        hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [800, 10, 50, 100],
      },
    ],
  };

  // Filtered chart data based on selected filter
  const filteredSalesChartData = {
    labels:
      selectedFilter === "month"
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : [],
    datasets: [
      {
        label: "Sales Data",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: selectedFilter === "month" ? [65, 59, 80, 81, 56, 55, 40] : [],
      },
    ],
  };

  const dailySalesData = [
    { date: "2023-09-01", sales: 100 },
    { date: "2023-09-02", sales: 150 },
    { date: "2023-09-03", sales: 120 },
    { date: "2023-09-04", sales: 90 },
  ];

  const filteredDailySalesData = dailySalesData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === selectedMonth.getMonth() &&
      itemDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const dailySalesValues = filteredDailySalesData.map((item) => item.sales);

  const dailySalesLabels = filteredDailySalesData.map((item) => item.date);

  const dailySalesChartData = {
    labels: dailySalesLabels,
    datasets: [
      {
        label: "Daily Sales",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: dailySalesValues,
      },
    ],
  };

  useEffect(() => {
    if (selectedFilter === "month") {
      filteredSalesChartData.labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ];
      filteredSalesChartData.datasets[0].data = [65, 59, 80, 81, 56, 55, 40];

      filteredSalesChartData.labels = dailySalesLabels;
      filteredSalesChartData.datasets[0].data = dailySalesValues;
    } else if (selectedFilter === "custom") {
      // Implement custom range filtering logic here
    }
  }, [selectedFilter, selectedMonth]);

  return (
    <>
      {getMembersLoading || getMembershipsLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgress size={80} />
        </div>
      ) : (
        <>
          <Typography sx={{ mb: 4 }}>REPORT CENTER</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* Sales Chart */}
                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Sales Chart
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="filter-select">
                          Select Filter
                        </InputLabel>
                        <Select
                          className="mb-4"
                          label="Select Filter"
                          id="filter-select"
                          value={selectedFilter}
                          onChange={handleFilterChange}
                          size="small"
                        >
                          <MenuItem value="month">By Month</MenuItem>
                          <MenuItem value="day">By Day</MenuItem>
                          <MenuItem value="custom">Custom Range</MenuItem>
                        </Select>
                      </FormControl>
                      {selectedFilter === "day" && (
                        <FormControl fullWidth>
                          <InputLabel htmlFor="month-select">
                            Select Month
                          </InputLabel>
                          <Select
                            label="Select Month"
                            id="month-select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            size="small"
                          >
                            <MenuItem value={new Date()}>
                              Current Month
                            </MenuItem>
                            <MenuItem value={new Date("2023-08-01")}>
                              August 2023
                            </MenuItem>
                            {/* Add more options as needed */}
                          </Select>
                        </FormControl>
                      )}
                      {selectedFilter === "day" ? (
                        <Line data={dailySalesChartData} />
                      ) : (
                        <Bar data={filteredSalesChartData} />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Membership Breakdown
                      </Typography>
                      <Pie data={getMembershipsData()} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`Total members: ${allMembers.length}`}
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`New members this month: ${
                                allMembers?.filter(
                                  (mem) =>
                                    mem.registered.month() ===
                                    new moment().month()
                                ).length
                              }`}
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h5" gutterBottom>
                          <MoneyIcon
                            style={{
                              backgroundColor: "#757575",
                              color: "#fff",
                              height: 20,
                              width: 20,
                              borderRadius: 2,
                              marginRight: 8,
                            }}
                          />{" "}
                          Sales
                        </Typography>
                        <FormControl variant="outlined">
                          <InputLabel htmlFor="sales-filter">
                            Select Filter
                          </InputLabel>
                          <Select
                            label="Select Filter"
                            id="sales-filter"
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            size="small"
                          >
                            <MenuItem value="month">By Month</MenuItem>
                            <MenuItem value="day">By Day</MenuItem>
                            <MenuItem value="custom">Custom Range</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Total Sales: 20,000 TND
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Card: 1,000 TND
                      </Typography>

                      <Divider sx={{ mt: 3, mb: 2 }} />

                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Pass</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Total Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>Pass 1</TableCell>
                              <TableCell>5</TableCell>
                              <TableCell>250 TND</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Pass 2</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>120 TND</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                {gymStatistics.map((statistic, index) => (
                  <Grid item xs={12} key={index}>
                    {/* Gym Statistics Cards */}
                    <Card sx={{ p: 2, mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {statistic.title}
                        </Typography>
                        <Typography variant="h4">{statistic.value}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
