import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import { getAll } from "../network/network";
import useUserStore from "../stores/useUserStore";
import { useLocation } from "react-router-dom";

const BoatDetail = () => {
  // Hardcoding the boatId for testing purposes

  const location = useLocation();
  const row = location.state;
  console.log(row);

  const boatId = 6;
  const [boatData, setBoatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useUserStore();
  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://dev.sailgloble.com/admin/provider-requests/boat/${row.requestTypeId}`
        );
        setBoatData(data.data);
        // setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting Providers:", error);
      }
    };

    fetchBoatDetails();
  }, [boatId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!boatData) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Failed to load boat details.
        </Typography>
      </Container>
    );
  }

  const {
    boatCoverImage,
    boatImages,
    boatLocationLat,
    boatLocationLong,
    boatTypeId,
    capacity,
    captainLicenseBack,
    captainLicenseFront,
    city,
    descriptionAr,
    descriptionEn,
    nameAr,
    nameEn,
    rating,
    shipIdentifier,
    shipLicenseBack,
    shipLicenseFront,
    ship_status,
  } = boatData;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {nameEn} ({nameAr})
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src={`https://dev.sailgloble.com/${boatCoverImage}`}
              alt="Boat Cover"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Boat Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" mb={"10px"}>
              <strong>Location:</strong> {city} (Lat: {boatLocationLat}, Long:{" "}
              {boatLocationLong})
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Capacity:</strong> {capacity} people
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Rating:</strong> {rating}
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Type ID:</strong> {boatTypeId}
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Ship Identifier:</strong> {shipIdentifier}
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Ship Status:</strong> {ship_status}
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Description (EN):</strong> {descriptionEn}
            </Typography>
            <Typography variant="body1" mb={"10px"}>
              <strong>Description (AR):</strong> {descriptionAr}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Boat Images</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {boatImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <img
                    src={`https://dev.sailgloble.com/${image}`}
                    alt={`Boat Image ${index + 1}`}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Licenses</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Captain License Front:</strong>
                </Typography>
                <img
                  src={captainLicenseFront}
                  alt="Captain License Front"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Captain License Back:</strong>
                </Typography>
                <img
                  src={captainLicenseBack}
                  alt="Captain License Back"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Ship License Front:</strong>
                </Typography>
                <img
                  src={shipLicenseFront}
                  alt="Ship License Front"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Ship License Back:</strong>
                </Typography>
                <img
                  src={shipLicenseBack}
                  alt="Ship License Back"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BoatDetail;
