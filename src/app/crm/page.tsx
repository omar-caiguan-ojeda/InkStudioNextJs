"use client";

import { useEffect, useState } from "react";
import CrmStats from "@/src/components/CrmStats";
import CustomersTable from "@/src/components/CustomersTable";
import AppointmentsTable from "@/src/components/AppointmentsTable";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed";
}

export default function CrmPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  async function loadData() {
    try {
      const [customersRes, appointmentsRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/appointments"),
      ]);

      const customersData = await customersRes.json();
      const appointmentsData = await appointmentsRes.json();

      setCustomers(customersData.customers || []);
      setAppointments(appointmentsData.appointments || []);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6 text-white">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-red-500">CRM - InkStudio</h1>
        <p className="text-gray-400">Panel de gestión de clientes y citas</p>
        <button
          onClick={loadData}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          🔄 Actualizar Datos
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <CrmStats customers={customers} appointments={appointments} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomersTable customers={customers} />
        <AppointmentsTable appointments={appointments} />
      </section>
    </div>
  );
}
