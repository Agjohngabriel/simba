import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectOnLogin() {
      const session = await getSession();
      if (session) window.location.replace("/bookings");
    }
    redirectOnLogin();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    return axios
      .post("/api/auth/signup", {
        name,
        username,
        email,
        password,
      })
      .then(() => {
        alert("success");
        window.location.replace("/");
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    <div className="flex flex-row items-center">
      <div className="bg-white rounded px-8 pt-6 mb-4 flex flex-col lg:w-2/3">
        <h1 className="leading-3 mb-5 font-bold">Scheduler.com</h1>
        <h1 className="font-extrabold text-4xl mb-8">
          You are one step
          <br /> away from
          <br /> simpler
          <br /> scheduling
        </h1>
        <p>
          <q>
            I love being able to use a tool that just works, and that is open source. As a developer, I love
            being empowered to contribute to a tool that I use regularly.
          </q>
        </p>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col m-11 lg:w-2/3">
        <div className="mb-6">
          <h1 className="font-semibold mb-7">Start your 14 days free trial</h1>
          <p className="text-xs">
            No credit card required. Try all pro features for 14 days. Upgrade at any time to Pro for
            $12/month.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              required
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            />
          </div>
          <label className="block text-grey-darker text-sm font-bold mb-2">username</label>
          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
                https://example.com/
              </span>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              required
              value={username}
              onInput={(e) => setUserName(e.currentTarget.value)}
              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              required
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-black
             hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isSubmitting}>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
