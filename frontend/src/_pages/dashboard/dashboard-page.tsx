"use client"

import BodyDashboard from "@/app/dashboard/_components/molecules/body-dashboard"
import { useState } from "react";

const MOCK_PETS = [
    { id: "1", name: "Max", type: "Perro", status: "Disponible", age: "2 años" },
    { id: "2", name: "Luna", type: "Gato", status: "Adoptado", age: "5 meses" },
    { id: "3", name: "Rocky", type: "Perro", status: "Disponible", age: "1 año" },
];

const MOCK_USERS = [
    { id: "1", name: "Ana Gómez", email: "ana@mail.com", role: "Adoptante", status: "Activo" },
    { id: "2", name: "Carlos Ruiz", email: "carlos@mail.com", role: "Voluntario", status: "Activo" },
    { id: "3", name: "María Lopez", email: "maria@mail.com", role: "Adoptante", status: "Inactivo" },
];

const MOCK_ADOPTIONS = [
    { id: "1", petName: "Luna", adopterName: "Ana Gómez", date: "2026-05-12", status: "Aprobado" },
    { id: "2", petName: "Max", adopterName: "Carlos Ruiz", date: "2026-07-02", status: "Pendiente" },
];

export default function DashboardPage() {

    const [activeTab, setActiveTab] = useState<'pets' | 'users' | 'adoptions'>('pets');

    // Cálculos rápidos de analíticas
    const availablePets = MOCK_PETS.filter(p => p.status === 'Disponible').length;
    const activeUsers = MOCK_USERS.filter(u => u.status === 'Activo').length;
    const pendingAdoptions = MOCK_ADOPTIONS.filter(a => a.status === 'Pendiente').length;

    // Helper local para renderizar Badges de estados con tus tokens de color
    const renderBadge = (status: string) => {
        const styles: Record<string, string> = {
            Disponible: "bg-terciary/20 text-slate-800",
            Adoptado: "bg-primary text-white",
            Activo: "bg-emerald-100 text-emerald-800",
            Inactivo: "bg-rose-100 text-rose-800",
            Aprobado: "bg-emerald-500 text-white",
            Pendiente: "bg-quaternary text-amber-900",
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-white text-foreground flex transition-colors duration-300">

            {/* 📈 CONTENEDOR PRINCIPAL */}
            <main className="flex-1 p-8 max-w-7xl mx-auto space-y-8 overflow-y-auto">
                <header className="border-b border-secondary/10 pb-4">
                    <h2 className="text-2xl font-bold text-primary">Panel de Control</h2>
                    <p className="text-sm text-slate-600">Monitoreo global del sistema de protección animal.</p>
                </header>

                {/* 📊 SECCIÓN DE MÉTRICAS (Molecules + Atoms inline) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-secondary/20 rounded-xl shadow-sm p-5 hover:border-primary/40 transition-colors">
                        <span className="text-sm font-semibold tracking-wider text-secondary uppercase">Mascotas Libres</span>
                        <p className="text-3xl font-bold text-primary mt-2">{availablePets}</p>
                        <span className="text-xs text-slate-500 block mt-1">Listas para un nuevo hogar</span>
                    </div>

                    <div className="bg-white border border-secondary/20 rounded-xl shadow-sm p-5 hover:border-primary/40 transition-colors">
                        <span className="text-sm font-semibold tracking-wider text-secondary uppercase">Comunidad Activa</span>
                        <p className="text-3xl font-bold text-primary mt-2">{activeUsers}</p>
                        <span className="text-xs text-slate-500 block mt-1">Voluntarios y adoptantes</span>
                    </div>

                    <div className="bg-white border border-secondary/20 rounded-xl shadow-sm p-5 hover:border-primary/40 transition-colors">
                        <span className="text-sm font-semibold tracking-wider text-secondary uppercase">Adopciones en Curso</span>
                        <p className="text-3xl font-bold text-primary mt-2">{pendingAdoptions}</p>
                        <span className="text-xs text-slate-500 block mt-1">Esperando validación</span>
                    </div>
                </section>

                {/* 📋 SECCIÓN DE TABLAS DINÁMICAS */}
                <section className="bg-white border border-secondary/20 rounded-xl shadow-sm overflow-hidden">
                    {activeTab === 'pets' && (
                        <>
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800">Listado Global de Mascotas</h3>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        {["ID", "Nombre", "Especie", "Edad", "Estado"].map((h, i) => (
                                            <th key={i} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_PETS.map(pet => (
                                        <tr key={pet.id} className="border-b border-slate-100 hover:bg-background/30 transition-colors">
                                            <td className="px-6 py-4 text-sm text-slate-700">{pet.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 font-medium">{pet.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{pet.type}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{pet.age}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{renderBadge(pet.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {activeTab === 'users' && (
                        <>
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800">Control de Usuarios</h3>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        {["ID", "Nombre", "Email", "Rol", "Estado"].map((h, i) => (
                                            <th key={i} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_USERS.map(user => (
                                        <tr key={user.id} className="border-b border-slate-100 hover:bg-background/30 transition-colors">
                                            <td className="px-6 py-4 text-sm text-slate-700">{user.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 font-medium">{user.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{user.role}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{renderBadge(user.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {activeTab === 'adoptions' && (
                        <>
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800">Historial de Solicitudes</h3>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        {["ID", "Mascota", "Adoptante", "Fecha de Alta", "Estado"].map((h, i) => (
                                            <th key={i} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_ADOPTIONS.map(adopt => (
                                        <tr key={adopt.id} className="border-b border-slate-100 hover:bg-background/30 transition-colors">
                                            <td className="px-6 py-4 text-sm text-slate-700">{adopt.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 font-medium">{adopt.petName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{adopt.adopterName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{adopt.date}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{renderBadge(adopt.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </section>
            </main>

        </div>
    );
}