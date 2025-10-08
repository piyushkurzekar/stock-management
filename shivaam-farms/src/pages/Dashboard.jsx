import Card from "../components/Card/Card";
import {CiCalendar} from "react-icons/ci";
import {MdCurrencyRupee} from "react-icons/md";
import {GoPeople} from "react-icons/go";
import {LuBox} from "react-icons/lu";
import CardBasic from "../components/CardBasic/CardBasic";
import RecentActivity from "../components/RecentActivity/RecentActivity";

const Dashboard = () => (
    <div className="overviewContainer container">

        <div className="py-4">
            <h2 className="fs-4 fw-500">Quick Actions</h2>
            <div className="row g-3 justify-content-center pb-4">
                <CardBasic cardTitle={"New Booking"} cardText={" Add a new villa booking"} cardColor={"#B7E4C7"} navigateTo="/booking"/>
                <CardBasic cardTitle={"Check-in form"} cardText={"Add new check-in entry "} cardColor={"#A3CCDA"} navigateTo="/checkinform"/>
                <CardBasic cardTitle={"Stock update"} cardText={"Update inventory levels"} cardColor={"#FFF3B0"} navigateTo="/stocks" />

            </div>
            <div className="row  g-3 justify-content-center pb-4">
                <h2 className="fs-4 fw-500">Overview</h2>
                <Card
                    cardTitle={"Total Booking"}
                    cardIcon={< CiCalendar fontSize = {
                    20
                }
                color = "#000000" />}
                    cardSubtitle={"24"}
                    cardTextNum={"+12%"}
                    cardText={" from last month"}/>
                <Card
                    cardTitle={"Monthly Revenue"}
                    cardIcon={< MdCurrencyRupee fontSize = {
                    20
                }
                color = "#000000" />}
                    cardSubtitle={"Rs. 45,231"}
                    cardTextNum={"+8.2%"}
                    cardText={" from last month"}/>
                <Card
                    cardTitle={"Active Staff"}
                    cardIcon={< GoPeople fontSize = {
                    20
                }
                color = "#000000" />}
                    cardSubtitle={"12"}
                    cardTextNum={"+2%"}
                    cardText={" from last month"}/>
                <Card
                    cardTitle={"Stock Status"}
                    cardIcon={< LuBox fontSize = {
                    20
                }
                color = "#000000" />}
                    cardSubtitle={"89%"}
                    cardTextNum={"-3%"}
                    cardText={" from last month"}
                    cardLoss={true}/>
            </div>
            <div className="py-4">
                <h2 className="fs-4 fw-500">Recent Activity</h2>
                <RecentActivity/>
            </div>
        </div>

    </div>
);

export default Dashboard