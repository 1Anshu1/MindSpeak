import { Link } from "react-router-dom";

const Breadcrumb = ({ data }) => {
    return (
        <div className="flex gap-2">
            {data.map((item, idx) => {
                return (
                    <div key={idx} className="">
                        <Link to={item.link} className="mr-2">
                            {item.name}
                        </Link>
                        {idx !== data.length - 1 ? ">" : ""}
                    </div>
                );
            })}
        </div>
    );
};
export default Breadcrumb;
