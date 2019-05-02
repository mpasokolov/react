<?php

namespace common\models;

use yii\base\Exception;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface {

    public static function tableName() {
        return 'users';
    }

    public function rules() {
        return [
            [['login', 'password'], 'safe'],
        ];
    }

    public function behaviors() {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id) {
        return static::findOne($id);
    }

    /**
     * {@inheritdoc}
     * @throws Exception
     */
    public static function findIdentityByAccessToken($token, $type = null) {
        $userId = $token -> getClaim('uid');

        return static::findOne(['id' => $userId]);
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username) {
        return static::findOne(['login' => $username]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId() {
        return $this -> getPrimaryKey();
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey() {
        return $this -> access_token;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey) {
        return $authKey === $this -> getAuthKey();
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password) {
        if (!\Yii::$app -> security -> validatePassword($password, $this -> password)) {
            $this -> addError('password', 'Логин или пароль неверны');
            return false;
        }
        return true;
    }

    public function beforeSave($insert) {
        if (parent ::beforeSave($insert)) {
            $this -> password = \Yii::$app -> security -> generatePasswordHash($this -> password);
            if ($this -> isNewRecord) {
                $this -> access_token = \Yii::$app -> security -> generateRandomString();
            }
            return true;
        } else {
            return false;
        }
    }

    public function setName($name) {
        $this -> username = $name;
    }
}