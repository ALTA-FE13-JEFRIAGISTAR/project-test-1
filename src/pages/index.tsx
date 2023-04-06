import { FC, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { TodoistApi } from "@doist/todoist-api-typescript";
import axios from "axios";

import Layout from "@/components/Layout";
import Swal from "sweetalert2";

interface DataType {
  id: string;
  content: string;
  description: string;
  is_completed: boolean;
}

const Home: FC = () => {
  const MySwal = withReactContent(Swal);

  const [datas, setDatas] = useState<DataType[]>([]);

  const [objSubmit, setObjSubmit] = useState<DataType>({
    id: "",
    content: "",
    description: "",
    is_completed: false,
  });

  const token = "ba59c31e5eadc57fcd44f63624587250eafeead6";

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("tasks", objSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Success to Add`,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function fetchData() {
    axios
      .get("tasks", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setDatas(response.data);
      })
      .catch(function (error) { });
  }

  function handleComplete(param: string) {
    axios
      .post(`tasks/${param}/close`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Was Changed to Complete`,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function handleDelete(param: string) {
    axios
      .delete(`tasks/${param}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const { data } = response.data;
        MySwal.fire({
          title: "Success",
          text: `Task Success to Delete`,
          showCancelButton: false,
        });
      })
      .catch(function (error) {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  return (
    <Layout>
      <div className="w-full container mx-auto mt-10 bg-pink-600">
        <div className=" container mx-auto">
          <div className="card flex-wrap">
            <section
              id="addTask"
              className="  card-body  shadow-xl"
            >
              <div className=" py-5">
                <p className=" text-xl text-black font-medium">Add the Task</p>
              </div>

              <form
                className="card flex-wrap "
                onSubmit={(event) => handleSubmit(event)}
              >
                <input
                  type="text"
                  placeholder="What should i do?"
                  className="input w-full my-5"
                  onChange={(event) =>
                    setObjSubmit({
                      ...objSubmit,
                      content: event.target.value,
                    })
                  }
                />
                <textarea
                  placeholder="is there anything to descript what should i do?"
                  className="textarea textarea-bordered w-full my-5"
                  onChange={(event) =>
                    setObjSubmit({
                      ...objSubmit,
                      description: event.target.value,
                    })
                  }
                ></textarea>

                <button className="btn  bg-black text-pink-600  border-white hover:bg-black-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10">
                  Add
                </button>
              </form>
              <div className=" py-5">
                <p className=" text-xl text-black font-medium">Task Assignment</p>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead className="text-black">
                    <tr>
                      <th>Item</th>
                      <th>Status</th>
                      <th></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data) => {
                      return (
                        <tr>
                          <th>
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="font-bold">{data.content}</div>
                              </div>
                            </div>
                          </th>
                          <td>
                            {data.is_completed == false
                              ? "Not Completed"
                              : "Completed"}
                          </td>
                          <td>
                            <Link
                              to={`/detail/${data.id}`}
                              className="btn btn-sm text-white"
                            >
                              Detail
                            </Link>
                          </td>
                          <th className="flex gap-1">
                            <button
                              className="btn btn-sm text-white"
                              onClick={(event) => handleComplete(data.id)}
                            >
                              Complete
                            </button>
                            <button
                              className="btn btn-sm text-red-600"
                              onClick={(event) => handleDelete(data.id)}
                            >
                              Delete
                            </button>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
