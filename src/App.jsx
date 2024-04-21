export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <header className="text-center text-2xl border-b border-slate-300 py-3 mb-2">
                <h1>Agregar Receta</h1>
            </header>
            <main
                className="px-2"
                >
            <form>
                <div
                    className="bg-white shadow p-2 mb-2 rounded"
                >
                        <input 
                            type="text" 
                            name="" 
                            className="bg-gray-100 rounded py-1 px-2" 
                            placeholder="Nombre receta"
                        />
                </div>

                <div
                    className="bg-white shadow p-2 rounded-sm"
                >
                        <button className="py-1 px-2">Siguiente</button>
                </div>
            </form>
            </main>
        </div>
    )
}