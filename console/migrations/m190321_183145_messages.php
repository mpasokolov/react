<?php

use yii\db\Migration;

/**
 * Class m190321_183145_messages
 */
class m190321_183145_messages extends Migration
{
    public function safeUp() {
        $this -> createTable('messages', [
            'id' => $this -> primaryKey(),
            'author' => $this -> string(100) -> notNull(),
            'text' => $this -> text() -> notNull(),
            'chat' => $this -> integer() -> notNull(),
            'created_at' => $this -> integer(10) -> notNull(),
            'updated_at' => $this -> integer(10)
        ]);

        $this -> addForeignKey('messages-chats', 'messages', 'chat', 'chats', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        $this -> dropForeignKey('messages-chats', 'messages');

        $this -> dropTable('messages');
    }
}