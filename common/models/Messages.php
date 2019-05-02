<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-03-23
 * Time: 17:37
 */

namespace common\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

class Messages extends ActiveRecord
{
    public function behaviors() {
        return [
            TimestampBehavior::class,
        ];
    }

    public function rules() {
        return [
            [['author', 'author_login', 'text', 'chat'], 'safe'],
        ];
    }
}