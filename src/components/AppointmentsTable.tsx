interface Appointment {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed";
}

export default function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center text-gray-400">
        <p>No hay citas registradas aún</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-red-500 mb-4">📅 Citas Recientes</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-red-900/30 text-red-500">
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Servicio</th>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Hora</th>
            <th className="p-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="border-b border-gray-700">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.service}</td>
              <td className="p-2">{a.date}</td>
              <td className="p-2">{a.time}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    a.status === "pending"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-green-900/30 text-green-400"
                  }`}
                >
                  {a.status === "pending" ? "Pendiente" : "Confirmada"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
