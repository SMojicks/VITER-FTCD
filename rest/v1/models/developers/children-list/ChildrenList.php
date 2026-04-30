<?php

class ChildrenList
{
    public $childrenList_aid;
    public $childrenList_is_active;
    public $childrenList_name;
    public $childrenList_birthday;
    public $childrenList_age;
    public $childrenList_residency;
    public $childrenList_limit;
    public $childrenList_story;
    public $childrenList_created;
    public $childrenList_updated;

    public $connection;
    public $lastInsertedId;

    public $start;
    public $total;
    public $search;
    public $tblSettingsChildrenList;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsChildrenList = "childrenlist";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsChildrenList}";
            $sql .= " ( ";
            $sql .= " childrenList_is_active, ";
            $sql .= " childrenList_name, ";
            $sql .= " childrenList_birthday, ";
            $sql .= " childrenList_age, ";
            $sql .= " childrenList_residency, ";
            $sql .= " childrenList_limit, ";
            $sql .= " childrenList_story, ";
            $sql .= " childrenList_created, ";
            $sql .= " childrenList_updated ";
            $sql .= ") values (";
            $sql .= " :childrenList_is_active, ";
            $sql .= " :childrenList_name, ";
            $sql .= " :childrenList_birthday, ";
            $sql .= " :childrenList_age, ";
            $sql .= " :childrenList_residency, ";
            $sql .= " :childrenList_limit, ";
            $sql .= " :childrenList_story, ";
            $sql .= " :childrenList_created, ";
            $sql .= " :childrenList_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "childrenList_is_active" => $this->childrenList_is_active,
                "childrenList_name" => $this->childrenList_name,
                "childrenList_birthday" => $this->childrenList_birthday,
                "childrenList_age" => $this->childrenList_age,
                "childrenList_residency" => $this->childrenList_residency,
                "childrenList_limit" => $this->childrenList_limit,
                "childrenList_story" => $this->childrenList_story,
                "childrenList_created" => $this->childrenList_created,
                "childrenList_updated" => $this->childrenList_updated,
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
            $sql .= " from {$this->tblSettingsChildrenList} ";
            
            // This acts as a safe base for the 'and' conditions below
            $sql .= " where true "; 
            
            // FILTER
            $sql .= $this->childrenList_is_active != '' ? " and childrenList_is_active = :childrenList_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " childrenList_name like :childrenList_name  " : " ";
            $sql .= $this->search != '' ? " or childrenList_birthday like :childrenList_birthday  " : " ";
            $sql .= $this->search != '' ? " or childrenList_age like :childrenList_age  " : " ";
            $sql .= $this->search != '' ? " or childrenList_residency like :childrenList_residency  " : " ";
            $sql .= $this->search != '' ? " or childrenList_limit like :childrenList_limit  " : " ";
            $sql .= $this->search != '' ? " or childrenList_story like :childrenList_story  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->childrenList_is_active != '' ? ["childrenList_is_active" => $this->childrenList_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "childrenList_name" => "%{$this->search}%",
                    "childrenList_birthday" => "%{$this->search}%",
                    "childrenList_age" => "%{$this->search}%",
                    "childrenList_residency" => "%{$this->search}%",
                    "childrenList_limit" => "%{$this->search}%",
                    "childrenList_story" => "%{$this->search}%",

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
            $sql .= " from {$this->tblSettingsChildrenList} ";
            
            $sql .= " where true ";
            
            // FILTER
            $sql .= $this->childrenList_is_active != '' ? " and childrenList_is_active = :childrenList_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " childrenList_name like :childrenList_name  " : " ";
            $sql .= $this->search != '' ? " or childrenList_birthday like :childrenList_birthday  " : " ";
            $sql .= $this->search != '' ? " or childrenList_age like :childrenList_age  " : " ";
            $sql .= $this->search != '' ? " or childrenList_residency like :childrenList_residency  " : " ";
            $sql .= $this->search != '' ? " or childrenList_limit like :childrenList_limit  " : " ";
            $sql .= $this->search != '' ? " or childrenList_story like :childrenList_story  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->childrenList_is_active != '' ? ["childrenList_is_active" => $this->childrenList_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "childrenList_name" => "%{$this->search}%",
                    "childrenList_birthday" => "%{$this->search}%",
                    "childrenList_age" => "%{$this->search}%",
                    "childrenList_residency" => "%{$this->search}%",
                    "childrenList_limit" => "%{$this->search}%",
                    "childrenList_story" => "%{$this->search}%",
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
            $sql =" update {$this->tblSettingsChildrenList} set ";
            $sql .= " childrenList_name = :childrenList_name, ";
            $sql .= " childrenList_birthday = :childrenList_birthday, ";
            $sql .= " childrenList_age = :childrenList_age, ";
            $sql .= " childrenList_residency = :childrenList_residency, ";
            $sql .= " childrenList_limit= :childrenList_limit, ";
            $sql .= " childrenList_story= :childrenList_story, ";
            $sql .= " childrenList_updated = :childrenList_updated ";
            $sql .= " where childrenList_aid = :childrenList_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "childrenList_name" => $this->childrenList_name,
                "childrenList_birthday" => $this->childrenList_birthday,
                "childrenList_age" => $this->childrenList_age,
                "childrenList_residency" => $this->childrenList_residency,
                "childrenList_limit" => $this->childrenList_limit,
                "childrenList_story" => $this->childrenList_story,
                "childrenList_updated" => $this->childrenList_updated,
                "childrenList_aid" => $this->childrenList_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }

    public function active(){
        try{
            $sql =" update {$this->tblSettingsChildrenList} set ";
            $sql .= " childrenList_is_active = :childrenList_is_active, "; 
            $sql .= " childrenList_updated = :childrenList_updated ";
            $sql .= " where childrenList_aid = :childrenList_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "childrenList_is_active" => $this->childrenList_is_active,
                "childrenList_updated" => $this->childrenList_updated,
                "childrenList_aid" => $this->childrenList_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function delete(){
        try{
            $sql =" delete from {$this->tblSettingsChildrenList} ";
            $sql .= " where childrenList_aid = :childrenList_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "childrenList_aid" => $this->childrenList_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function checkName(){
        try{
            $sql = "select ";
            $sql .= " childrenList_name ";
            $sql .= " from {$this->tblSettingsChildrenList} ";
            $sql .= " where childrenList_name = :childrenList_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "childrenList_name" => $this->childrenList_name,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }
}