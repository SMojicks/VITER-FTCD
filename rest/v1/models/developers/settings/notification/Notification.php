<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_name;
    public $notification_email;
    public $notification_phone;
    public $notification_purpose;
    public $notification_created;
    public $notification_updated;

    public $connection;
    public $lastInsertedId;

    public $start;
    public $total;
    public $search;
    public $tblSettingsNotification;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsNotification = "settings_notification";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsNotification}";
            $sql .= " ( ";
            $sql .= " notification_is_active, ";
            $sql .= " notification_name, ";
            $sql .= " notification_email, ";
            $sql .= " notification_phone, ";
            $sql .= " notification_purpose, ";
            $sql .= " notification_created, ";
            $sql .= " notification_updated ";
            $sql .= ") values (";
            $sql .= " :notification_is_active, ";
            $sql .= " :notification_name, ";
            $sql .= " :notification_email, ";
            $sql .= " :notification_phone, ";
            $sql .= " :notification_purpose, ";
            $sql .= " :notification_created, ";
            $sql .= " :notification_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_created" => $this->notification_created,
                "notification_updated" => $this->notification_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            returnError(123);
            $query = false;
        }
        return $query;
    }

public function readAll(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            
            // This acts as a safe base for the 'and' conditions below
            $sql .= " where true "; 
            
            // FILTER
            $sql .= $this->notification_is_active != '' ? " and notification_is_active = :notification_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " notification_name like :notification_name  " : " ";
            $sql .= $this->search != '' ? " or notification_email like :notification_email  " : " ";
            $sql .= $this->search != '' ? " or notification_phone like :notification_phone  " : " ";
            $sql .= $this->search != '' ? " or notification_purpose like :notification_purpose  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->notification_is_active != '' ? ["notification_is_active" => $this->notification_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "notification_name" => "%{$this->search}%",
                    "notification_email" => "%{$this->search}%",
                    "notification_phone" => "%{$this->search}%",
                    "notification_purpose" => "%{$this->search}%",
                ] : [],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function readLimit(){
        try{
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsNotification} ";
            
            $sql .= " where true ";
            
            // FILTER
            $sql .= $this->notification_is_active != '' ? " and notification_is_active = :notification_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " notification_name like :notification_name  " : " ";
            $sql .= $this->search != '' ? " or notification_email like :notification_email  " : " ";
            $sql .= $this->search != '' ? " or notification_phone like :notification_phone  " : " ";
            $sql .= $this->search != '' ? " or notification_purpose like :notification_purpose  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->notification_is_active != '' ? ["notification_is_active" => $this->notification_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "notification_name" => "%{$this->search}%",
                    "notification_email" => "%{$this->search}%",
                    "notification_phone" => "%{$this->search}%",
                    "notification_purpose" => "%{$this->search}%",
                ] : [],
                "start" => $this->start - 1,
                "total" => $this->total,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql =" update {$this->tblSettingsNotification} set ";
            $sql .= " notification_name = :notification_name, ";
            $sql .= " notification_email = :notification_email, ";
            $sql .= " notification_phone = :notification_phone, ";
            $sql .= " notification_purpose = :notification_purpose, ";
            $sql .= " notification_updated = :notification_updated ";
            $sql .= " where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_name" => $this->notification_name,
                "notification_email" => $this->notification_email,
                "notification_phone" => $this->notification_phone,
                "notification_purpose" => $this->notification_purpose,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }

    public function active(){
        try{
            $sql =" update {$this->tblSettingsNotification} set ";
            $sql .= " notification_is_active = :notification_is_active, "; 
            $sql .= " notification_updated = :notification_updated ";
            $sql .= " where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_updated" => $this->notification_updated,
                "notification_aid" => $this->notification_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function delete(){
        try{
            $sql =" delete from {$this->tblSettingsNotification} ";
            $sql .= " where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function checkName(){
        try{
            $sql = "select ";
            $sql .= " notification_name ";
            $sql .= " from {$this->tblSettingsNotification} ";
            $sql .= " where notification_name = :notification_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_name" => $this->notification_name,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }
}