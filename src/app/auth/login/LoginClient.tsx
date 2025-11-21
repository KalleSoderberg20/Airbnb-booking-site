import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message ?? "");
      else setMessage("Inloggad!");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message ?? "");
      else setMessage("Registrerad! Kolla din mail.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-300">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Logga in" : "Registrera dig"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Logga in" : "Registrera"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-red-600 font-semibold">{message}</p>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isLogin ? "Skapa konto istället" : "Redan konto? Logga in"}
          </button>
        </div>
      </div>
    </div>
  );
}