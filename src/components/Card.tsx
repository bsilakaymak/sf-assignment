import { Launch } from "../gql/__generated__/graphql";
import { formatDate } from "../utils/formatDate";

const Card = ({
  launch,
  selected,
  onClick,
}: {
  launch: Launch;
  selected: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const bg = selected
    ? "bg-lime-200 border-solid border-2 border-black"
    : "bg-white";

  return (
    <button
      onClick={onClick}
      className={`${bg} max-w-sm rounded overflow-hidden shadow-lg border-solid border-2 border-primary hover:opacity-70`}
    >
      <div className="px-6 py-4 bg-opacity-20">
        <p className="font-bold text-xl mb-2 text-gray-500">
          Mission: {launch.mission_name}
        </p>
        <p>Date: {formatDate(launch.launch_date_local)}</p>
        <p className="text-red-900">
          Rocket name: {launch.rocket && launch.rocket.rocket_name}
        </p>
      </div>
    </button>
  );
};

export default Card;
