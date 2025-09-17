import VenueForm from '../components/common/VenueForm';

export default function CreateVenuePage() {
  const handleSubmit = async (data: any) => {
    //  call API to create venue
    console.log('New venue data:', data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Venue</h1>
      <VenueForm onSubmit={handleSubmit} />
    </div>
  );
}
