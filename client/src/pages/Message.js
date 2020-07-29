import React from 'react';
import { Container, Jumbotron, Row, Col, Card, Image } from 'react-bootstrap';

const Message = ({ user }) => {

    return (
        <Container>
            <h3></h3>
            <Jumbotron>
                <Card className='mt-2'>
                    <Card.Header as={Row} className='' dir='rtl'>
                        <Col md={1} sm={2} xs={2} className=" text-right" >
                            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            </svg>
                        </Col>
                        <Col md={2} className="pt-3 text-right">
                            <Card.Title>שלום ישראל</Card.Title>
                        </Col>
                    </Card.Header>
                    <Card.Body as={Row} className='text-right' >
                        <p>
                            בוכנה הידראולית היא התקן המשתמש בלחץ של נוזל, ברוב המקרים שמן, על מנת לדחוף גליל שמבצע עבודה מכנית. משאבת שמן מזרימה שמן בלחץ אל הבוכנה. כתוצאה מלחץ השמן, מוט הבוכנה שבגליל נע קדימה או אחורה.
                            רצוי לנקז אוויר במערכת, כי אוויר הוא גז הניתן לדחיסה ואילו שמן הוא נוזל שלא נדחס. אוויר הכלוא בשמן ולא נוקז עשוי לגרום לתופעה הנקראת קוויטציה.
                        </p>
                    </Card.Body>
                    <Card.Footer className="text-right">
                        18/18/2018 18:00
                    </Card.Footer>
                </Card>

                <Card className='mt-2' >
                    <Card.Header as={Row} className='' dir='rtl'>
                        <Col md={1} sm={2} xs={2} className=" text-right" >
                            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            </svg>
                        </Col>
                        <Col md={2} className="pt-3 text-right">
                            <Card.Title>אתה</Card.Title>
                        </Col>
                    </Card.Header>
                    <Card.Body as={Row} className='text-right' >
                        <p>
                            כל פרי מכיל 2-3 כפות סוכר, אך גם שופע ברכיבי תזונה חשובים. בכדי להרוויח את כל היתרונות הבריאותיים רצוי לאכול פירות כמו שהם, ולצמצם ככל הניתן שתיית מיצי פירות (גם כאלו שנסחטו במקום) המכילים בעיקר את סוכר הפרי ולא הרבה יותר. בכוס ממוצעת (240 מ"ל) של מיץ פירות טבעי ללא תוספת סוכר יש 20 גרם של סוכר, כלומר כ-5 כפיות סוכר, ערכים דומים לאלו של כוס קולה.
                        </p>
                    </Card.Body>
                    <Card.Footer className="text-right">
                        18/18/2018 18:00
                    </Card.Footer>
                </Card>
                <Card className='mt-2' >
                    <Card.Header as={Row} className='' dir='rtl'>
                        <Col md={1} sm={2} xs={2} className=" text-right" >
                            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                            </svg>
                        </Col>
                        <Col md={2} className="pt-3 text-right">
                            <Card.Title>שלום ישראל</Card.Title>
                        </Col>
                    </Card.Header>
                    <Card.Body as={Row} className='text-right' >
                        <p>
                            נציין שהיו מקרים שגברים ייצרו חלב ואף הניקו תינוקות מפטמותיהם [1]. לרוב הסיבה היא שיבוש בתפקוד בלוטת יותרת המוח עקב גידול, תופעות לוואי של תרופות או רעב קיצוני. כתוצאה מכך הבלוטה משחררת הורמונים, שלא נמצאים בגברים בדרך כלל, הגורמים לייצור החלב. מדובר במקרים נדירים מאוד ולכן אין בכך תשובה לשאלה מדוע לגברים, בכללותם, יש פטמות
                        </p>
                    </Card.Body>
                    <Card.Footer className="text-right">
                        18/18/2018 18:00
                    </Card.Footer>
                </Card>
            </Jumbotron>
        </Container>
    );
}

export default Message;