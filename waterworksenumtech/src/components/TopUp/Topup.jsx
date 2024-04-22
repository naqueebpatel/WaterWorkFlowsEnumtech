import React, { useState, useEffect } from "react";
import
    {
        MDBValidation,
        MDBValidationItem,
        MDBInput,
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBCard,
        MDBCardBody,
        MDBTypography
    } from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
function formatDate ( tdate )
{
    const dateObject = new Date( tdate );
    const formattedDate = dateObject.toISOString().split( 'T' )[ 0 ];
    return formattedDate;
}

export default function TransactionInward ()
{

    const [ subscriberData, setSubscriberData ] = useState( [] );
    const [ subscriberName, setSubscriberName ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ payBtnState, setPayBtnState ] = useState( true );

    useEffect( () =>
    {
        fetchSubscriberData();
    }, [] );

    const fetchSubscriberData = async () =>
    {
        try
        {
            setLoading( true );
            const response = await axios.get(
                'http://localhost:8090/waterwork/get/getAllSubscriber'
            );
            // if(!response.data) setPayBtnState(false)
            // else setPayBtnState(true)
            setSubscriberData( response.data );
            console.log( response.data );
        } catch ( error )
        {
            console.error( 'Error fetching subscriber data:', error );
        } finally
        {
            setLoading( false );
        }
    };

    const [ formValue, setFormValue ] = useState( {
        tdate: formatDate( Date.now() ),
        amount: "",
        particular: "",
        subscriberNo: ""
    } );

    const handleSubscriber = ( id ) =>
    {
        const filterSub = subscriberData.filter( ( sub ) => ( sub.subscriberNo === +id ) );
        setPayBtnState( filterSub && filterSub.length > 0 ? false : true );
        console.log( filterSub );
        setSubscriberName( filterSub );
    };

    const onChange = ( e ) =>
    {
        const { name, value } = e.target;
        if ( name === "subscriberNo" )
        {
            setFormValue( { ...formValue, [ e.target.name ]: e.target.value } );
            handleSubscriber( value );
        }
        setFormValue( { ...formValue, [ e.target.name ]: e.target.value } );
    };

    const handleChanges = ( event ) =>
    {
        event.preventDefault();

        const payload = {
            tdate: formValue.tdate,
            amount: parseInt( formValue.amount ),
            particular: formValue.particular,
            subscriberNo: parseInt( formValue.subscriberNo )
        };

        console.log( payload );

        axios
            .post( `http://localhost:8090/waterwork/add/topup`, payload )
            .then( ( response ) =>
            {
                console.log( "Response data:", response.data );
                if ( response.status === 200 )
                {
                    Swal.fire( 'Success', 'Updated successfully', 'success' );
                } else
                {
                    Swal.fire( 'Error', 'Failed to update record', 'error' );
                }
            } )
            .catch( ( error ) =>
            {
                Swal.fire( 'Error', 'Failed to Add', 'error' );
                console.error( "Error:", error.message );
            } );

        setFormValue( {
            tdate: formatDate( Date.now() ),
            amount: "",
            particular: "",
            subscriberNo: "",
        } );
        setSubscriberName( [] );
    };

    console.log( "PAY BTN", payBtnState );

    return (
        <>
            <MDBContainer className="py-5" style={ { maxWidth: "1100px" } }>
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol>
                        <MDBCard className="my-4 shadow-5 justify-content-center align-items-center">
                            <MDBCol md="12">
                                <MDBCardBody className="p-md-5 text-black">
                                    <MDBTypography
                                        tag="h3"
                                        className="mb-3 text-uppercase text-center"
                                    >
                                        TOPUP
                                    </MDBTypography>
                                    <form onSubmit={ handleChanges }>
                                        <MDBValidation className="row g-3">
                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={ formValue.tdate }
                                                    name="tdate"
                                                    type="date"
                                                    disabled
                                                    label="Transaction Date"
                                                />
                                            </MDBValidationItem>
                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={ formValue.particular }
                                                    type="text"
                                                    name="particular"
                                                    onChange={ onChange }
                                                    label="DETAILS"
                                                />
                                            </MDBValidationItem>



                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={ formValue.amount }
                                                    name="amount"
                                                    onChange={ onChange }
                                                    required
                                                    label="₹ XX-XX"
                                                />
                                            </MDBValidationItem>

                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={ formValue.amount }
                                                    name="amount"
                                                    onChange={ onChange }
                                                    required
                                                    label="₹ XX-XX"
                                                />
                                            </MDBValidationItem>
                                        </MDBValidation>

                                        <MDBValidation className="row g-3 py-5">
                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={ formValue.subscriberNo }
                                                    name="subscriberNo"
                                                    onChange={ onChange }
                                                    required
                                                    label="Subscriber No"
                                                />
                                            </MDBValidationItem>
                                            <MDBValidationItem className="col-md-3">
                                                <MDBInput
                                                    value={
                                                        subscriberName.length > 0
                                                            ? `${ subscriberName[ 0 ].firstName } ${ subscriberName[ 0 ].lastName }` : 'NOT FOUND' }
                                                    name="Name"
                                                    disabled
                                                    label="SUBSCRIBER NAME"
                                                />
                                            </MDBValidationItem>
                                        </MDBValidation>

                                        <div className="d-flex justify-content-end pt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-lg ms-2"
                                                style={ { backgroundColor: "#00ffff9e" } }
                                                disabled={ payBtnState }
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCol>
                            {/* </MDBRow> */ }
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </>
    );
}