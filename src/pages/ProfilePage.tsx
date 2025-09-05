import { Bookings } from "../components/common/Bookings";

export function ProfilePage() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <img src="./src/assets/747456ED-2562-4303-8A75-7C203966CE26_1_105_c.jpeg" alt="" />
        <div>
          <ul>
            <li>Name</li>
            <li>Email</li>
            <li>Rating</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Your bookings</h2>
        <Bookings />
      </div>
    </div>
  );
}
