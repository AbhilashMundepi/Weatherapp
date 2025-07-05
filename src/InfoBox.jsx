import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './InfoBox.css';

export default function InfoBox({ info }) {
  const HOT_URL = "https://plus.unsplash.com/premium_photo-1688804790068-4a0978939cd0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0";
  const COLD_URL = "https://images.unsplash.com/photo-1519944159858-806d435dc86b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0";
  const RAIN_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0";

  const weatherIcon =
    info.humidity > 60 ? <ThunderstormIcon className="weather-icon" /> :
    info.temp > 15 ? <WbSunnyIcon className="weather-icon" /> :
    <AcUnitIcon className="weather-icon" />;

  const backgroundImage =
    info.humidity > 60 ? RAIN_URL :
    info.temp > 15 ? HOT_URL :
    COLD_URL;

  return (
    <div className="info-box">
      <Card className="weather-card">
        <CardMedia
          component="img"
          height="180"
          image={backgroundImage}
          alt="Weather"
        />
        <CardContent>
          <Typography variant="h5" component="div" className="city-heading">
            {info.city} {weatherIcon}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" className="weather-details">
            <p><strong>Temperature:</strong> {info.temp}&deg;C</p>
            <p><strong>Humidity:</strong> {info.humidity}%</p>
            <p><strong>Min Temp:</strong> {info.tempMin}&deg;C</p>
            <p><strong>Max Temp:</strong> {info.tempMax}&deg;C</p>
            <p><strong>Description:</strong> <i>{info.weather}</i></p>
            <p><strong>Feels Like:</strong> {info.feelslike}&deg;C</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
