<?php
class MailerService {
    private $from;

    public function __construct($fromEmail, $fromName = '') {
        $this->from = $fromName ? "$fromName <$fromEmail>" : $fromEmail;
    }

    public function sendMail($to, $subject, $body, $headers = []) {
        $defaultHeaders = [
            'From' => $this->from,
            'Reply-To' => $this->from,
            'Content-type' => 'text/html; charset=UTF-8',
            'X-Mailer' => 'PHP/' . phpversion()
        ];


        $allHeaders = array_merge($defaultHeaders, $headers);

        $headersString = '';
        foreach ($allHeaders as $key => $value) {
            $headersString .= "$key: $value\r\n";
        }

        return mail($to, $subject, $body, $headersString);
    }
}