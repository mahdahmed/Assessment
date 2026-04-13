import { useState } from "react";
import { Button, InputField, Modal } from "../../components";
import { toast } from "react-toastify";
import { CircleAlert } from "lucide-react";

const ComponentsDemo = () => {
  const [toastLoading, setToastLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFieldsModalVisible, setIsFieldsModalVisible] = useState(false);

  const handletoast = () => {
    setToastLoading(true);

    setTimeout(() => {
      toast.success("Test toast");
      setToastLoading(false);
    }, 1000);
  };
  return (
    <div className="">
        <div className="flex items-center">
      <Button variant="primary" onClick={handletoast} loading={toastLoading} icon={<CircleAlert />}>
        Show toast
      </Button>
      <Button
        variant="danger"
        className="ml-5"
        onClick={() => toast.error("error Toast")}
      >
        Danger
      </Button>
      <Button
        variant="success"
        className="ml-5"
        onClick={() => toast.success("Success Toast")}
      >
        Success
      </Button>
      <Button
        variant="white"
        className="ml-5"
        onClick={() => toast.info("info Toast")}
      >
        White
      </Button>
      </div>
      <div className="mt-5">
        <Button variant="primary" onClick={() => setIsModalVisible(true)}>
          Open Modal
        </Button>
        <Button variant="primary" className="ml-5" onClick={() => setIsFieldsModalVisible(true)}>
          Open Modal With fields
        </Button>
        <Modal
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={"Modal With inputs"}
          footer={<div className="bg-green-100 w-full">Modal footer</div>}
        >
          <h1>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam hic
            harum neque reprehenderit maiores atque labore inventore similique
            deserunt incidunt a nemo, rem eum ea veritatis molestiae
            consequuntur dolorum error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Nobis, dolorem? Quisquam ipsam animi dicta fuga
            nulla veniam soluta perferendis enim odio distinctio debitis
            obcaecati nostrum quo, culpa error a tenetur? Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Magnam hic harum neque
            reprehenderit maiores atque labore inventore similique deserunt
            incidunt a nemo, rem eum ea veritatis molestiae consequuntur dolorum
            error. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Nobis, dolorem? Quisquam ipsam animi dicta fuga nulla veniam soluta
            perferendis enim odio distinctio debitis obcaecati nostrum quo,
            culpa error a tenetur? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Magnam hic harum neque reprehenderit maiores atque
            labore inventore similique deserunt incidunt a nemo, rem eum ea
            veritatis molestiae consequuntur dolorum error. Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Nobis, dolorem? Quisquam
            ipsam animi dicta fuga nulla veniam soluta perferendis enim odio
            distinctio debitis obcaecati nostrum quo, culpa error a tenetur?
          </h1>
        </Modal>
        <Modal
          isOpen={isFieldsModalVisible}
          onClose={() => setIsFieldsModalVisible(false)}
          title={"New Modal"}
          footer={<Button variant="success">Submit</Button>}
        >
          <InputField label={'Name'} name={"name"} />
        </Modal>
      </div>
    </div>
  );
};

export default ComponentsDemo;
