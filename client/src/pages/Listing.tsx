import { Grid, Image } from "@mantine/core";
import landImage from "../assets/land.jpg";
import houseImage from "../assets/building.jpg";
import hostelImage from "../assets/hostel.jpg";
import flatImage from "../assets/flat.jpg";
import { Link } from "react-router-dom";

const Listing = () => {
  return (
    <div className="mx-40">
      <h1 className="text-2xl font-medium my-4 ">Properties </h1>
      <p className="text-gray-600 translate-y-[-20px]">
        View or add properties
      </p>

      <Grid py={4}>
        <Grid.Col span={4}>
          <Link to="/listing/room">
            <Image
              src="room.jpeg"
              alt="image of flat"
              width={350}
              height={200}
              radius="md"
              className="hover:shadow-card hover:rounded-lg"
            />

            <h3 className="text-xl text-center font-medium font-fontPop py-[2px] w-[350px]">
              Room
            </h3>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}>
          <Link to="/listing/land">
            <Image
              src={landImage}
              alt="image of land"
              width={350}
              height={200}
              radius="md"
              className="hover:shadow-card hover:rounded-lg"
            />
            <h3 className="text-xl text-center font-medium font-fontPop py-[2px] w-[350px]">
              Land
            </h3>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}>
          <Link to="/listing/house">
            <Image
              src={houseImage}
              alt=""
              width={350}
              height={200}
              radius="md"
              className="hover:shadow-card hover:rounded-lg"
            />
            <h3 className="text-xl text-center font-medium font-fontPop py-[2px] w-[350px]">
              House
            </h3>
          </Link>
        </Grid.Col>
      </Grid>
      <Grid className="pb-8">
        <Grid.Col span={4}>
          <Link to="/listing/flat">
            <Image
              src={flatImage}
              alt="image of land"
              width={350}
              height={200}
              radius="md"
              className="hover:shadow-card hover:rounded-lg"
            />
            <h3 className="text-xl text-center font-medium font-fontPop py-[2px] w-[350px]">
              Flat
            </h3>
          </Link>
        </Grid.Col>
        <Grid.Col span={4}>
          <Link to="/listing/hostel">
            <Image
              src={hostelImage}
              alt=""
              width={350}
              height={200}
              radius="md"
              className="hover:shadow-card hover:rounded-lg"
            />
            <h3 className="text-xl text-center font-medium font-fontPop py-[2px] w-[350px]">
              Hostel
            </h3>
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Listing;
