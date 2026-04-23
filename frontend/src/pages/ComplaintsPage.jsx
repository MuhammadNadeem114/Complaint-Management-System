import DashboardLayout from '../components/DashboardLayout';
import ComplaintListSection from '../components/ComplaintListSection';

const ComplaintsPage = () => {
  return (
    <DashboardLayout title="My complaints" subtitle="Review complaint status and delete pending requests.">
      <ComplaintListSection />
    </DashboardLayout>
  );
};

export default ComplaintsPage;
