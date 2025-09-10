interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  createdAt: string;
}

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center text-gray-400">
        <p>No hay clientes registrados aún</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-red-500 mb-4">👥 Clientes Recientes</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-red-900/30 text-red-500">
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Servicio</th>
            <th className="p-2 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b border-gray-700">
              <td className="p-2">{c.name || "N/A"}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.phone || "N/A"}</td>
              <td className="p-2">{c.service || "N/A"}</td>
              <td className="p-2">
                {new Date(c.createdAt).toLocaleDateString("es-ES")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
