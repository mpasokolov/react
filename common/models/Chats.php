<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-03-23
 * Time: 18:03
 */

namespace common\models;


use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

class Chats extends ActiveRecord {
    public function behaviors() {
        return [
            TimestampBehavior::class,
        ];
    }

    public function fields()
    {
        return ['id', 'admin', 'name'];
    }

    public function extraFields()
    {
        return ['messages'];
    }

    public function rules() {
        return [
            [['name', 'admin', 'messages'], 'safe'],
        ];
    }

    public function getMessages() {
        return $this -> hasMany(Messages::class, ['chat' => 'id']);
    }
}