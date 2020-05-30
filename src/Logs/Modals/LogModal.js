import React, {useEffect, useState} from "react";
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import API from "../../Utils/API";
import {useHistory, useParams} from "react-router-dom";
const cameraURL = process.env.REACT_APP_CAMERA_API_URL;

async function getData(endpoint) {
    const res = await API.get(endpoint);
    return res.data;
}


const LogModal = ({location}) => {
    let history = useHistory();
    const params = useParams();
    const {state = {}} = location;
    const id = state.id || params.id;

    if (params.id !== undefined) {
        state.modal = true;
    }


    const [modal_, setModal] = useState(false);
    const [log, setLog] = useState({});


    function get_detail_info() {
        getData(`logs/${id}`).then(data => {
                let log = data['log'];
                setLog(log);
                setModal(state.modal);
            }
        )
    }

    function onClose() {
        setModal(false);
        history.push('/logs/camera_logs');
    }

    function onCreateReport() {
        setModal(false);
        history.push(`/reports/add?log_id=${id}`);
    }

    useEffect(() => {
        get_detail_info();
    }, []);

    return (
        <>{
            modal_ ? <MDBModal
                isOpen={modal_}
                toggle={onClose}
                contentClassName="bg-dark"
                centered
                size="lg"
            >
                <MDBModalHeader
                    toggle={onClose}
                >Camera log detail info
                </MDBModalHeader>
                <MDBModalBody>
                    <div className="container text-white">
                        <p>Camera {log.camera_id} - Location: {log.location}</p>
                        <p>Recognized objects: {log.recognized_objects}</p>
                        <p>Datetime: {new Date(log.date_time).toLocaleString()}</p>
                        <p>Video recording</p>
                        <div className="embed-responsive embed-responsive-4by3">
                            <video className="embed-responsive-item" autobuffer playsinline controls>
                                <source src={`${cameraURL}video/${log.video_filename}`}/>
                            </video>
                        </div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={onClose}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={onCreateReport}>Create report</MDBBtn>
                </MDBModalFooter>
            </MDBModal> : null
        }
        </>)
};

export default LogModal;
