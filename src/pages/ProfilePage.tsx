import { Bookings } from '../components/common/Bookings';

export function ProfilePage() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <img src="" alt="" />
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
