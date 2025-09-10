interface CrmStatsProps {
  customers: any[];
  appointments: { status: string }[];
}

export default function CrmStats({ customers, appointments }: CrmStatsProps) {
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-red-500 mb-6">📊 Estadísticas</h2>
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-3xl font-bold text-red-500">{customers.length}</p>
          <p className="text-gray-400 text-sm">Clientes</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-500">{appointments.length}</p>
          <p className="text-gray-400 text-sm">Citas</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-500">{pendingCount}</p>
          <p className="text-gray-400 text-sm">Pendientes</p>
        </div>
      </div>
    </div>
  );
}
