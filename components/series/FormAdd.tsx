import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import seriesSchema from "@/lib/formik/series/add";
import { Multiselect } from "multiselect-react-dropdown";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SeriesFormAdd() {
  const { data: session } = useSession();
  const userID = session?.user?.id;
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      userID: userID,
      seriesname: "",
      seriesslug: "",
      seriesdescription: "",
      seriesalternativenames: "",
      seriesauthor: "",
      seriesartist: "",
      seriesyear: "",
      seriesserialization: "",
      seriesscore: "",
      seriestype: "",
      seriesstatus: "",
      seriesgenres: "",
      seriesthumbnail: "",
      seriescover: "",
    },
    validationSchema: seriesSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  }); 


  const data = values;


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const [seriesslug, setseriesslug] = useState(siteUrl + "/series/");

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [selectedImageThumbnail, setSelectedImageThumbnail] = useState("");
  const [selectedFileThumbnail, setSelectedFileThumbnail] = useState<File>();
  const [uploadingCover, setUploadingCover] = useState(false);
  const [selectedImageCover, setSelectedImageCover] = useState("");
  const [selectedFileCover, setSelectedFileCover] = useState<File>();
  
  const GenreList = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Comedy" },
    { id: 4, name: "Drama" },
    { id: 5, name: "Fantasy" },
    { id: 6, name: "Horror" },
    { id: 7, name: "Mystery" },
    { id: 8, name: "Psychological" },
    { id: 9, name: "Romance" },
    { id: 10, name: "Sci-fi" },
    { id: 11, name: "Slice of Life" },
    { id: 12, name: "Supernatural" },
    { id: 13, name: "Thriller" },
  ];

  const [options] = useState(GenreList);

  // functions for thumbnail
  const handleImageUploadThumbnail = async () => {
    setUploadingThumbnail(true);
    try {
      if (!selectedFileThumbnail) return;
      const formData = new FormData();
      formData.append("myImage", selectedFileThumbnail);
      const { data } = await axios.post("/api/upload/thumbnail/post", formData);
      console.log(data.img_links[0]);
      setFieldValue("seriesthumbnail", data.img_links[0]);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploadingThumbnail(false);
  };


  const deleteThumbnail = async () => {
    setSelectedImageThumbnail("");
    setSelectedFileThumbnail(undefined);
  };



  // functions for cover
  const handleImageUploadCover = async () => {
    setUploadingCover(true);
    try {
      if (!selectedFileCover) return;
      const formData = new FormData();
      formData.append("myImage", selectedFileCover);
      const { data } = await axios.post("/api/upload/cover/post", formData);
      console.log(data.img_links[0]);
      setFieldValue("seriescover", data.img_links[0]);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploadingCover(false);
  };

  const deleteCover = () => {
    setSelectedImageCover("");
    setSelectedFileCover(undefined);
  };

  function handleSlug() {
    const slug = values.seriesname
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setseriesslug(siteUrl + "/series/" + slug);
    setFieldValue("seriesslug", slug);
  }

  
  const router = useRouter();

  const addwhitaxios = async () => {
    axios.post("/api/series/post", { data })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        router.push("/series");
      })
  };


  function uploadimage(ev: any) {
    ev.preventDefault();
    try {
      handleImageUploadThumbnail();
      handleImageUploadCover();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  }

  function addseries(ev: any) {
    ev.preventDefault();
    try {
      handleSubmit();
      addwhitaxios();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  }

  return (
    <form className="flex flex-col w-full" onSubmit={addseries}>
      <h1 className="text-2xl font-semibold text-gray-800 ml-2">
        {t("add_series")}
      </h1>
      <div className="flex flex-row justify-between">
        <div className="w-2/3">
          <div>
            <div className="flex flex-col m-2">
              <input
                className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesname && touched.seriesname
                  ? "border-red-400"
                  : "border-gray-400"
                  } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                type="text"
                name="seriesname"
                id="seriesname"
                placeholder={t("series_name")}
                value={values.seriesname}
                onChange={(e) => {
                  handleSlug();
                  handleChange(e);
                }}
                onBlur={handleBlur}
              />
              {errors.seriesname && touched.seriesname && (
                <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                  <span className="text-red-500 text-sm">
                    {errors.seriesname}
                  </span>
                </div>
              )}
              <div id="series_slug" className="text-gray-500 text-sm">
                <span className="text-gray-800">{t("slug")}: </span>
                <span className="text-blue-700">{seriesslug}</span>
              </div>
            </div>
            <div className="flex flex-col m-2">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-800 ml-2">
                  {t("description")}
                </h2>
                <textarea
                  className={`px-3 py-1.5 text-lg leading-normal h-20 w-full outline-none mb-3 bg-white min-h-8 border-2 ${errors.seriesdescription && touched.seriesdescription
                    ? "border-red-400"
                    : "border-gray-400"
                    } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                  id="seriesdescription"
                  placeholder={t("description")}
                  name="seriesdescription"
                  value={values.seriesdescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.seriesdescription && touched.seriesdescription && (
                  <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                    <span className="text-red-500 text-sm">
                      {errors.seriesdescription}
                    </span>
                  </div>
                )}
              </div>
              <div id="series_info" className="text-gray-500 text-sm">
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("alternative_names")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesalternativenames &&
                        touched.seriesalternativenames
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      id="seriesalternativenames"
                      type="text"
                      name="seriesalternativenames"
                      placeholder={t("alternative_names")}
                      value={values.seriesalternativenames}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesalternativenames &&
                      touched.seriesalternativenames && (
                        <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                          <span className="text-red-500 text-sm">
                            {errors.seriesalternativenames}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("author")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesauthor && touched.seriesauthor
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      type="text"
                      name="seriesauthor"
                      placeholder={t("author")}
                      value={values.seriesauthor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesauthor && touched.seriesauthor && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriesauthor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("artist")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesartist && touched.seriesartist
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      type="text"
                      name="seriesartist"
                      placeholder={t("artist")}
                      value={values.seriesartist}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesartist && touched.seriesartist && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriesartist}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("year")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesyear && touched.seriesyear
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      type="text"
                      name="seriesyear"
                      placeholder={t("year")}
                      value={values.seriesyear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesyear && touched.seriesyear && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriesyear}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("serialization")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesserialization &&
                        touched.seriesserialization
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      type="text"
                      name="seriesserialization"
                      placeholder={t("serialization")}
                      value={values.seriesserialization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesserialization &&
                      touched.seriesserialization && (
                        <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                          <span className="text-red-500 text-sm">
                            {errors.seriesserialization}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("score")}</div>
                  <div className="w-3/4">
                    <input
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesscore && touched.seriesscore
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      type="number"
                      name="seriesscore"
                      placeholder={t("score")}
                      value={values.seriesscore}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.seriesscore && touched.seriesscore && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriesscore}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("type")}</div>
                  <div className="w-3/4">
                    <select
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriestype && touched.seriestype
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      id="seriestype"
                      name="seriestype"
                      value={values.seriestype}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">{t("type")}</option>
                      <option value="manga">{t("manga")}</option>
                      <option value="manhwa">{t("manhwa")}</option>
                      <option value="manhua">{t("manhua")}</option>
                    </select>
                    {errors.seriestype && touched.seriestype && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriestype}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                  <div className="w-1/4">{t("status")}</div>
                  <div className="w-3/4">
                    <select
                      className={`px-3 py-1.5 text-lg leading-normal h-9 w-full outline-none mb-3 bg-white min-h-7 border-2 ${errors.seriesstatus && touched.seriesstatus
                        ? "border-red-400"
                        : "border-gray-400"
                        } rounded-md text-gray-800 box-border hover:border-blue-500 focus:border-blue-500`}
                      id="seriesstatus"
                      name="seriesstatus"
                      value={values.seriesstatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">{t("status")}</option>
                      <option value="ongoing">{t("ongoing")}</option>
                      <option value="completed">{t("completed")}</option>
                      <option value="dropped">{t("dropped")}</option>
                      <option value="onhold">{t("onhold")}</option>
                      <option value="cancelled">{t("cancelled")}</option>
                      <option value="hiatus">{t("hiatus")}</option>
                      <option value="comingsoon">{t("comingsoon")}</option>
                    </select>
                    {errors.seriesstatus && touched.seriesstatus && (
                      <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                        <span className="text-red-500 text-sm">
                          {errors.seriesstatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-white rounded-md shadow-md p-4 pt-0">
            <div className="text-gray-800 mb-2 flex flex-col justify-between">
              <div className="w-full mb-2">
                <div className="text-gray-800 mb-2 flex flex-col justify-between items-center">
                  <h3 className="text-lg font-bold">{t("genre")}</h3>
                  <div className="w-full">
                    <div className="text-gray-800 mb-2 flex flex-row justify-between items-center">
                      <div className="w-full">
                        <div className="flex flex-row justify-between items-center">
                          <div className="w-full">
                            <Multiselect
                              options={options}
                              displayValue="name"
                              onSelect={(selectedList) => {
                                const selectedGenres = selectedList.map((genre: any) => ({
                                  id: genre.id,
                                  name: genre.name
                                }));
                                setFieldValue("seriesgenres", selectedGenres);
                              }}
                              onRemove={(selectedList) => {
                                const selectedGenres = selectedList.map((genre: any) => ({
                                  id: genre.id,
                                  name: genre.name
                                }));
                                setFieldValue("seriesgenres", selectedGenres);
                              }}                              
                            />

                            {errors.seriesgenres && touched.seriesgenres && (
                              <div className="border-2 border-red-400 rounded-md p-1 bg-red-50 text-center">
                                <span className="text-red-500 text-sm">
                                  {errors.seriesgenres}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4">
                <div className="max-w-4xl mx-auto p-5 space-y-6 flex flex-col justify-between items-center">
                  {!uploadingThumbnail ? (
                    <label>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="seriesthumbnail"
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];
                            setSelectedImageThumbnail(
                              URL.createObjectURL(file)
                            );
                            setSelectedFileThumbnail(file);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      <div
                        className={`aspect-video rounded flex items-center justify-center cursor-pointer border-2 hover:border-blue-500 border-dashed w-80 ${selectedImageThumbnail ? "w-full" : "w-40 h-64"
                          } ${errors.seriesthumbnail && touched.seriesthumbnail
                            ? "border-red-400"
                            : "border-gray-400"
                          }`}
                      >
                        {selectedImageThumbnail ? (
                          <Image
                            src={selectedImageThumbnail}
                            alt=""
                            className="max-h-64"
                            width={200}
                            height={256}
                          />
                        ) : (
                          <span
                            className={`${errors.seriesthumbnail && touched.seriesthumbnail
                              ? "text-red-400"
                              : "text-gray-400"
                              }`}
                          >
                            {t("upload_thumbnail")}
                          </span>
                        )}
                      </div>
                    </label>
                  ) : (
                    <div
                      className={`aspect-video rounded flex items-center justify-center cursor-pointer border-2 border-gray-400 hover:border-blue-500 border-dashed w-full`}
                    >
                      <span>{t("loading")}...</span>
                    </div>
                  )}
                  {selectedFileThumbnail && (
                    <div className="flex flex-col justify-between items-center w-full">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        onClick={deleteThumbnail}
                      >
                        {t("remove")}
                      </button>

                    </div>
                  )}
                </div>
              </div>

              <div className="w-full mt-4">
                <div className="max-w-4xl mx-auto p-5 space-y-6 flex flex-col justify-between items-center">
                  {!uploadingCover ? (
                    <label>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="seriescover"
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];
                            setSelectedImageCover(URL.createObjectURL(file));
                            setSelectedFileCover(file);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      <div
                        className={`aspect-video rounded flex items-center justify-center cursor-pointer border-2 hover:border-blue-500 border-dashed w-80 ${errors.seriescover && touched.seriescover
                          ? "border-red-400"
                          : "border-gray-400"
                          }`}
                      >
                        {selectedImageCover ? (
                          <Image
                            width={200}
                            height={256}
                            src={selectedImageCover}
                            alt=""
                          />
                        ) : (
                          <span
                            className={`${errors.seriescover && touched.seriescover
                              ? "text-red-400"
                              : "text-gray-400"
                              }`}
                          >
                            {t("upload_cover")}
                          </span>
                        )}
                      </div>
                    </label>
                  ) : (
                    <div
                      className={`aspect-video rounded flex items-center justify-center cursor-pointer border-2 border-gray-400 hover:border-blue-500 border-dashed w-full`}
                    >
                      <span>{t("loading")}...</span>
                    </div>
                  )}
                  {selectedFileCover && (
                    <div className="flex flex-col justify-between items-center w-full">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button"
                        onClick={deleteCover}
                      >
                        {t("remove")}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div id="puplisher" className="w-full">
                <div className="text-gray-800 mb-2 flex flex-row justify-between">
                  <div>
                    <button
                      className={`border-2 border-blue-500 border-opacity-50 rounded-md px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white ${!selectedFileCover || !selectedFileThumbnail 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : ""
                        }`}
                      disabled={
                        !selectedFileCover || !selectedFileThumbnail
                          ? true
                          : false
                      }
                      type="button"
                      onClick={uploadimage}
                    >
                      {t("upload_image")}
                    </button>
                  </div>
                  <div>
                    <button
                      className={`border-2 border-blue-500 border-opacity-50 rounded-md px-2 py-1 text-blue-500 hover:bg-blue-500 hover:text-white ${!values.seriescover || !values.seriesthumbnail || !values.seriesslug 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : ""
                        }`}
                      disabled={
                        !values.seriescover || !values.seriesthumbnail || !values.seriesslug || !values.seriesstatus || !values.seriestype
                          ? true
                          : false
                      }
                      type="submit"
                    >
                      {t("publish")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
